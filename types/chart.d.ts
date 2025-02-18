declare module '@/styles/shared.module.css' {
  const styles: {
    readonly [key: string]: string;
  };
  export default styles;
}

interface ChartContainerProps extends React.ComponentProps<"div"> {
  config: ChartConfig;
  children: React.ComponentProps<typeof RechartsPrimitive.ResponsiveContainer>["children"];
}

interface TooltipContentProps extends React.ComponentProps<"div"> {
  active?: boolean;
  payload?: any[];
  // ...other props...
}

interface LegendContentProps extends React.ComponentProps<"div"> {
  payload?: any[];
  verticalAlign?: "top" | "bottom";
  // ...other props...
}
