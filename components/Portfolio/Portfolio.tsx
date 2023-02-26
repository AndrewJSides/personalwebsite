import React, { useState, useEffect } from "react";
import Square from "./Square/Square";
import Example from "./Charts";
import Planetarium from "./Projects/Three";
// import threejs project from "./Projects/threejs";

const Portfolio = () => {
  const [isPlanetariumOpen, setIsPlanetariumOpen] = useState(false);
  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData("text", event.currentTarget.id);
  };

  const enableDropping = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    const id = event.dataTransfer.getData("text");
    console.log(`Somebody dropped an element with id: ${id}`);
  };

  const options = ["uv", "pv", "amt"];
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [curentSort, setCurrentSort] = useState<string>("uv");

  useEffect(() => {
    console.log("selectedOption: ", selectedOption);
    setDraw(true);
  }, [selectedOption]);

  const [draw, setDraw] = useState(false);

  const start = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ] as any;

  const randomizeDataEvery3Seconds = () => {
    const newData = data.map((item: any) => {
      return {
        ...item,
        uv: Math.floor(Math.random() * 10000),
        pv: Math.floor(Math.random() * 10000),
        amt: Math.floor(Math.random() * 10000),
      };
    });
    setData(newData);
  };

  const bubbleSortOnUV = () => {
    const newData = [...data];
    let swapped;
    do {
      swapped = false;
      for (let i = 0; i < newData.length - 1; i++) {
        if (newData[i][curentSort] > newData[i + 1][curentSort]) {
          let temp = newData[i];
          newData[i] = newData[i + 1];
          newData[i + 1] = temp;
          swapped = true;
        }
      }
    } while (swapped);
    setData(newData);
  };

  useEffect(() => {
    const newData = [...data];
    let swapped;

    do {
      // No swaps have been made yet
      swapped = false;
      for (let i = 0; i < newData.length - 1; i++) {
        if (newData[i][curentSort] > newData[i + 1][curentSort]) {
          let temp = newData[i];
          newData[i] = newData[i + 1];
          newData[i + 1] = temp;
          swapped = true;
        }
      }
    } while (swapped);

    setData(newData);
  }, [curentSort]);

  useEffect(() => {
    bubbleSortOnUV();
  }, [curentSort]);

  const [number, setNumber] = useState(0);

  const printData = (dat: any) => {
    console.log("------------------");
    let output = "[";
    dat.forEach((item: any) => {
      output += item[curentSort] + ", ";
    });
    output += "]";
    console.log(output);
  };

  const [data, setData] = useState(start);

  const [enterButton, setEnterButton] = useState("Enter");

  return (
    <div className="flex flex-row justify-center items-center p-64">
      {/* <div className="flex flex-col justify-center items-center m-8 border-2 border-black rounded-xl w-[800px] h-[600px]">
          <div className="flex flex-row justify-between items-center w-[200px] font-bold">
            Sort by:{" "}
            <select
              onChange={(e) => setCurrentSort(e.target.value)}
              value={curentSort}
              className="bg-slate-600 text-white font-bold py-2 px-4 rounded-xl m-2 w-[90px]"
            >
              <option value="uv">uv</option>
              <option value="pv">pv</option>
              <option value="amt">amt</option>
            </select>
          </div>
          <div className="flex flex-row justify-between items-center w-[200px] font-bold">
            Displaying:
            <select
              onChange={(e) => setSelectedOption(e.target.value)}
              className="bg-slate-600 text-white font-bold py-2 px-4 rounded-xl w-[90px] m-2"
            >
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          {draw && (
            <div className="p-8 m-4 rounded-xl bg-slate-800">
              <Example option={selectedOption} data={data} />
            </div>
          )}
          <div className="flex flex-row justify-evenly items-center">
            <button
              onClick={randomizeDataEvery3Seconds}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-xl"
            >
              Randomize
            </button>
          </div>
          <div className="text-2xl font-bold">{number}</div>
        </div> */}
      <button
        onClick={() => {
          setEnterButton(enterButton === "Enter" ? "Exit" : "Enter");
          setIsPlanetariumOpen(!isPlanetariumOpen);
        }}
        className="bg-purple-900 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-xl"
      >
        {enterButton} the Planetarium
      </button>
      <Planetarium isPlanetariumOpen={isPlanetariumOpen} />
    </div>
  );
};

export default Portfolio;
