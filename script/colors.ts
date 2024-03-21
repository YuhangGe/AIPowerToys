import { red, green, blue, yellow, lime, purple, gold } from '@ant-design/colors';
import type { IntRange } from 'type-fest';
/** 需要引入的颜色名称，注意和首行的 import 保持一致 */
const PalleteNames = ['red', 'green', 'blue', 'yellow', 'lime', 'purple', 'gold'] as const;

type N = (typeof PalleteNames)[number];
type R = IntRange<1, 10>;
type R2 = `${R}00` | '50';
/** 动态生成每个颜色的色板类型，以 red 为例，包括 red, red-50, red-100 到 red-900。*/
type Pallete = {
  [p in N]: string;
} & {
  [p in `${N}-${R2}`]: string;
};

/**
 * 将 antd 的色板，转换成 tailwind 的常见色板名称体系，即 -red-50, -red-100 到 -red-900。
 * 同时，为了方便使用，增加了 -red 主色名，和 -red-500 等价。
 * 此外，参考 https://ant.design/docs/spec/colors，增加了常用颜色名称的映射。
 */
export interface AntdThemeColors extends Pallete {
  primary: string;
  'selected-background': string;
  hover: string;
  click: string;
  success: string;
  link: string;
  warning: string;
  error: string;
  'leading-text': string;
  'normal-text': string;
  'secondary-text': string;
  'disabled-text': string;
  border: string;
  separator: string;
  'layout-background': string;
  white: string;
  black: string;
  transparent: string;
  'current-color': string;
}
/**
 * 将 antd 的色板，转换成 tailwind 的常见色板名称体系，即 -red-50, -red-100 到 -red-900。
 * 同时，为了方便使用，增加了 -red 主色名，和 -red-500 等价。
 * 此外，参考 https://ant.design/docs/spec/colors，增加了常用颜色名称的映射。
 *
 * -
 * 示例：
 *
 * ```html
 * <div className="text-brand text-success text-warning text-error">hello, world</div>
 * ```
 */
function AntdColors() {
  const colors = {} as unknown as AntdThemeColors;
  [red, green, blue, yellow, lime, purple, gold].forEach((clr, i) => {
    const name = PalleteNames[i];
    Object.assign(colors, {
      ...Object.fromEntries(clr.map((c, i) => [`${name}-${i === 0 ? 50 : i * 100}`, c])),
      [name]: clr.primary ?? clr[5],
    });
  });
  /** https://ant.design/docs/spec/colors **/
  colors.primary = colors.blue; // 品牌主色，brand primary color
  colors['selected-background'] = colors['blue-50'];
  colors.hover = colors['blue-400'];
  colors.click = colors['blue-600'];
  colors.success = colors.green;
  colors.link = colors.blue;
  colors.warning = colors.gold;
  colors.error = colors['red-400'];
  colors['leading-text'] = 'rgba(0, 0, 0, 0.88)';
  colors['normal-text'] = 'rgba(0, 0, 0, 0.88)';
  colors['secondary-text'] = 'rgba(0, 0, 0, 0.65)';
  colors['disabled-text'] = 'rgba(0, 0, 0, 0.25)';
  colors.border = 'rgb(217, 217, 217)';
  colors.separator = 'rgba(5, 5, 5, 0.06)';
  colors['layout-background'] = '#f5f5f5';
  colors.white = '#ffffff';
  colors.black = '#000000';
  colors.transparent = 'transparent';
  colors['current-color'] = 'currentcolor';
  return colors;
}

/**
 * 将 antd 的色板，转换成 tailwind 的常见色板名称体系，即 -red-50, -red-100 到 -red-900。
 * 同时，为了方便使用，增加了 -red 主色名，和 -red-500 等价。
 * 此外，参考 https://ant.design/docs/spec/colors，增加了常用颜色名称的映射。
 *
 * tailwind.config.js 配置文件和业务模块代码都从 @binfoe/common 中引用此色板，
 * 从而统一 html 和 js（比如 echarts） 的样式。
 */
export const themeColors = AntdColors();
