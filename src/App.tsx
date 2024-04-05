import { useEffect, useState } from 'react'
import { AgChartsReact } from "ag-charts-react";
import { AgChartOptions } from 'ag-charts-community';
import './App.css'
import { initialData } from './assets/initialData';
import { getGas } from './APIs/snowtrace';
import { SaveData, GetAllData } from './APIs/supabase';

interface GasDataType {
  time: Date | string,
  slow: number,
  standard: number,
  fast: number
}

function App() {
  const [options, setOptions] = useState<AgChartOptions>({
    title: {
      text: "Med Gas Price",
    },
    data: initialData,
    series: [
      {
        type: "line",
        xKey: "time",
        yKey: "slow",
        yName: "Slow",
      },
      {
        type: "line",
        xKey: "time",
        yKey: "standard",
        yName: "Standard",
      },
      {
        type: "line",
        xKey: "time",
        yKey: "fast",
        yName: "Fast",
      },
    ],
  });
  const [gasDatas, setGasDatas] = useState<GasDataType[]>([]);

  useEffect(() => {
    const intervalGetGas = setInterval(getGagsAndSaveSupabase, 20000);

    const fetchData = async () => {
      const datas: GasDataType[] | any = await GetAllData();
      if (datas) setGasDatas(datas);
    };

    fetchData();

    return () => {
      clearInterval(intervalGetGas);
    }
  }, [])

  useEffect(() => {
    const data: AgChartOptions = {
      title: {
        text: "Med Gas Price",
      },
      data: gasDatas.length ? gasDatas : initialData,
      series: [
        {
          type: "line",
          xKey: "time",
          yKey: "slow",
          yName: "Slow",
        },
        {
          type: "line",
          xKey: "time",
          yKey: "standard",
          yName: "Standard",
        },
        {
          type: "line",
          xKey: "time",
          yKey: "fast",
          yName: "Fast",
        },
      ],
    }
    setOptions(data)
  }, [gasDatas])

  const getGagsAndSaveSupabase = async () => {
    const value: any = await getGas()
    const data = {
      time: new Date(),
      slow: value?.low,
      standard: value?.avg,
      fast: value?.high
    }
    if(value) SaveData(data);
    if(value) setGasDatas([...gasDatas, data]);
  }

  return (
    <>
      <AgChartsReact options={options} />
    </>
  )
}

export default App
