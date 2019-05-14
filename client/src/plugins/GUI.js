import Dat from 'dat.gui';
import 'three-dat.gui';
import config from '../config'

const GUI = {
  gui: {},
};

export default GUI;

export const initGui = () => {
  GUI.gui = new Dat.GUI();
  if (!config.gui.visible) {
    Dat.GUI.toggleHide();
  }

  // Postprocessing, Lighting
  GUI.rendering = GUI.gui.addFolder('Rendu');

  // Camera
  GUI.controls = GUI.gui.addFolder('Contrôles');

  // Scene
  GUI.scene = GUI.gui.addFolder('Scene');

  // Oiseaux, poissons, vent
  GUI.world = GUI.gui.addFolder('World');

  // Map
  GUI.map = GUI.gui.addFolder('Map');
};

export const destroyGui = () => {
  GUI.gui.destroy();
};
