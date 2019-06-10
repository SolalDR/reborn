import Emitter from '@solaldr/emitter';

class Loader extends Emitter {
  /**
   * @constructor
   * @param {[{test: RegExp, loader: Object}]} rules
   */
  constructor({
    rules = [],
  } = {}) {
    super();

    this.pendingFiles = [];
    this.loadedFiles = [];
    this.groups = [];
    this.verbose = true;
    this.rules = rules;
  }

  /**
   * Test if a group is loaded
   * @param {string|null} group
   */
  isLoaded(group = null) {
    if (group === null && this.pendingFiles.length > 0) {
      return false;
    }

    let isLoaded = true;
    if (group !== null) {
      this.pendingFiles.forEach((file) => {
        if (file.groups.indexOf(group) >= 0) {
          isLoaded = false;
        }
      });
    }

    return isLoaded;
  }

  /**
   * Return the list of loaded file in a specific group
   * @param {string|null} group
   * @private
   */
  getFiles(group = null) {
    const results = {};
    this.loadedFiles.forEach((file) => {
      if ((group === null || file.groups.indexOf(group) >= 0)) {
        results[file.name] = file.result;
      }
    });
    return results;
  }

  get(group = null, synchronous = false) {
    if (synchronous) {
      console.log('SYNCHRONOUS-------', group);

      if (this.isLoaded(group)) {
        return this.getFiles(group);
      }
      return false;
    }

    return new Promise((resolve) => {
      if (this.isLoaded(group)) {
        console.log('1-------', group);
        resolve(this.getFiles(group));
        return;
      }

      console.log('2-------', group);

      this.on(`load:${group}`, (results) => {
        console.log('3-------', group);
        resolve(results);
      });
    });
  }


  /**
   * General onLoad callback
   * @private
   */
  onLoad(file, result) {
    this.loadedFiles.push({
      result,
      name: file.name,
      path: file.path,
      groups: file.groups,
      datas: file.datas ? file.datas : null,
    });

    this.pendingFiles.splice(this.pendingFiles.indexOf(file), 1);

    file.groups.forEach((group) => {
      if (this.isLoaded(group)) {
        this.emit(`load:${group}`, this.getFiles(group));
      }
    });

    if (this.isLoaded()) {
      this.emit('load', this.getFiles());
    }
  }

  /**
   * General onProgress callback
   * @private
   */
  onProgress() {
    let loaded = 0;
    let total = 0;
    this.pendingFiles.forEach((file) => {
      if (file.loaded && file.total) {
        loaded += file.loaded;
        total += file.total;
      }
    });

    this.emit('progress', {
      loaded,
      total,
      progress: loaded / total,
    });
  }


  /**
   * Load a file
   * @param {{name: string, path: string}|string}
   * @param {[string]} inheritanceGroup The list of group which scope the current group
   */
  addFile(file, inheritanceGroup = []) {
    const finalFile = file.name ? file : { name: file, path: file, datas: file.datas };

    let finalPath = '';
    inheritanceGroup.forEach((group) => {
      finalPath += (group.base) ? group.base : '';
    });

    finalPath += finalFile.path;

    const groups = inheritanceGroup.map(group => group.name);

    this.pendingFiles.push({
      name: finalFile.name,
      path: finalPath,
      datas: finalFile.datas,
      groups,
      status: Loader.PENDING,
      loading: {
        progress: 0,
        total: null,
        loaded: 0,
      },
    });
  }

  /**
   * Load a group
   * @param {{name: string, base: string, files: [], groups: []}} group Represent the group data
   * @param {[group]} inheritanceGroup The list of group which scope the current group
   */
  addGroup({
    name = null,
    base = '',
    files = [],
    groups = [],
  } = {}, inheritanceGroup = []) {
    if (!name) {
      return null;
    }

    files.forEach((file) => {
      this.addFile(file, [...inheritanceGroup, {
        name, base, files, groups,
      }]);
    });

    groups.forEach((group) => {
      this.addGroup(group, [...inheritanceGroup, {
        name, base, files, groups,
      }]);
    });

    if (this.groups.indexOf(name) < 0) {
      this.groups.push(name);
    }

    return this;
  }

  /**
   * Load a group by his name
   * @param {string} name
   */
  loadGroup(name) {
    this.pendingFiles.forEach((file) => {
      if (file.groups.indexOf(name) >= 0) {
        this.loadFile(file);
      }
    });
  }

  /**
   * Load a file
   * @param {{name: string, path: string, group: []}} file
   */
  loadFile(file) {
    let loader = null;
    this.rules.some((rule) => {
      if (file.path.match(rule.test)) {
        loader = rule.loader;
        return true;
      }
      return false;
    });

    if (this.loader === null) {
      if (this.verbose) console.warn(`Loader: The type "${file.type}" is not supported`);
      return null;
    }

    loader.load(
      file.path,
      (e) => {
        this.onLoad(file, e);
      },
      (xhr) => {
        file.loaded = xhr.loaded;
        file.total = xhr.total;
        this.onProgress(file);
      },
      (e) => {
        this.onLoad(file, e);
        if (this.verbose) console.error(`Loader: Cannot load file "${file.name}" with path "${file.path}"`);
      },
      file.datas ? file.datas : {},
    );

    return this;
  }
}

Loader.LOADED = 1;
Loader.PENDING = 2;
Loader.ERROR = 3;

export default Loader;
