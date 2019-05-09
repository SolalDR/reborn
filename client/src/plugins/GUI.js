import Dat from 'dat.gui';
import 'three-dat.gui';

const GUI = {
  gui: {},
};

export default GUI;

export const initGui = () => {
  GUI.gui = new Dat.GUI();

  // Postprocessing, Lighting
  GUI.rendering = GUI.gui.addFolder('Rendu');

  // Camera
  GUI.scene = GUI.gui.addFolder('Contrôles');

  // Oiseaux, poissons, vent, Map
  GUI.environnement = GUI.gui.addFolder('Environnement');
};

export const destroyGui = () => {
  GUI.gui.destroy();
};
