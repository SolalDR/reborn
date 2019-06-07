import themes from './themes';
import Config from '@/utils/Config';

const themeConfig = {
  themes,
  currentTheme: new Config(),
};

export { themeConfig };
export default themeConfig.currentTheme;
