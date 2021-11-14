import { Color, Label, MultiDataSet } from "ng2-charts";

export interface Doghnut{
    tittle:string
    doughnutChartLabels: Label[],
    colors:Color[],
    doughnutChartData: MultiDataSet
}