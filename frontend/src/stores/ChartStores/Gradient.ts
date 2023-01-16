export namespace Gradient {
  /**
   *  Get Gradient Value for current Data
   * @param ctx context of current ChartJS
   * @param chartArea Area of current ChartJS
   * @param data data of current ChartJS
   * @param scales Axes of current ChartJS
   * @returns Gradient value
   */
  export function getGradient(ctx, chartArea, data, scales) {
    const { left, right, top, bottom, width, height } = chartArea;
    const { x, y } = scales;
    const gradientBorder = ctx.createLinearGradient(0, 0, 0, bottom);
    let shift: number = y.getPixelForValue(data.datasets[0].data[0]) / bottom;
    if (shift > 1) {
      shift = 1;
    }
    if (shift < 0) {
      shift = 0;
    }
    gradientBorder.addColorStop(0, "rgba(75,192,192,1)");
    gradientBorder.addColorStop(shift, "rgba(75,192,192,1)");
    gradientBorder.addColorStop(shift, "rgba(255,26,104,1)");
    gradientBorder.addColorStop(1, "rgba(255,26,104,1)");
    return gradientBorder;
  }

  /**
   *  Get BelowGradient Value for current Data
   * @param ctx context of current ChartJS
   * @param chartArea Area of current ChartJS
   * @param data data of current ChartJS
   * @param scales Axes of current ChartJS
   * @returns BelowGradient value
   */
  export function getBelowGradient(ctx, chartArea, data, scales) {
    const { left, right, top, bottom, width, height } = chartArea;
    const { x, y } = scales;
    const gradientBelow = ctx.createLinearGradient(
      0,
      y.getPixelForValue(data.datasets[0].data[0]),
      0,
      bottom
    );
    gradientBelow.addColorStop(0, "rgba(255,26,104,0)");
    gradientBelow.addColorStop(1, "rgba(255,26,104,0.5)");
    return gradientBelow;
  }

  /**
   *  Get AboveGradient Value for current Data
   * @param ctx context of current ChartJS
   * @param chartArea Area of current ChartJS
   * @param data data of current ChartJS
   * @param scales Axes of current ChartJS
   * @returns AboveGradient value
   */
  export function getAboveGradient(ctx, chartArea, data, scales) {
    const { left, right, top, bottom, width, height } = chartArea;
    const { x, y } = scales;
    const gradientAbove = ctx.createLinearGradient(
      0,
      y.getPixelForValue(data.datasets[0].data[0]),
      0,
      top
    );
    gradientAbove.addColorStop(0, "rgba(75,192,192,0)");
    gradientAbove.addColorStop(1, "rgba(75,192,192,0.5)");
    return gradientAbove;
  }
}
