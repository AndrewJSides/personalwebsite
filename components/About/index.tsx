import React, { Children, useEffect, useState } from "react";
import MenuBarContainer from "../MenuBar/MenuBarContainer";
import Image from "next/image";
const About = () => {
  const data = {
    0: {
      name: "Walmart",
      start: "Aug 2022",
      end: "Present",
      description:
        "As a Software Engineer at Walmart, I work on the front end of the seller-facing web application using TypeScript & React.",
      link: "https://tech.walmart.com/content/walmart-global-tech/en_us.html",
      img: "/spark_logo.png",
    },
    1: {
      name: "Santa Clara University",
      start: "Mar 2022",
      end: "Present",
      description: "Working towards a Master's degree in Computer Science.",
      link: "https://www.scu.edu/engineering/academic-programs/department-of-computer-engineering/graduate/ms-in-computer-science-and-engineering/",
      img: "/scu.png",
    },
    2: {
      name: "Orbee",
      start: "Jan 2022",
      end: "Jul 2022",
      description: "Worked as a frontend software engineer.",
      link: "https://www.orbee.com/",
      img: "/orbee_logo.png",
    },
    3: {
      name: "Viewpoint Financial Network",
      start: "June 2020",
      end: "May 2021",
      description: "Worked as a financial advisor for individuals.",
      link: "https://www.marinerwealthadvisors.com/locations/san-francisco-bay-area/pleasanton/",
      img: "/vpn_logo.png",
    },
    4: {
      name: "Ameriprise Financial",
      start: "Dec 2016",
      end: "May 2020",
      description: "Worked as an asociate on a team of financial advisors.",
      link: "https://www.ameriprise.com/",
      img: "/amp_logo.png",
    },
    5: {
      name: "UC Berkeley",
      start: "Aug 2014",
      end: "May 2016",
      description: "Earned a Bachelor's degree in Economics",
      link: "https://www.econ.berkeley.edu/",
      img: "/uc_logo.png",
    },
  } as any;

  const generateHexColor = () => {
    const hex = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += hex[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const [colors, setColors] = useState<string[]>([]);
  const [color, setColor] = useState<string>("bg-black");

  useEffect(() => {
    const colors = [];
    for (let i = 0; i < 10; i++) {
      colors.push(generateHexColor());
    }
    console.log("colors: ", colors);
    setColors(colors);
  }, []);
  useEffect(() => {
    setColor(colors[Math.floor(Math.random() * colors.length)]);
  }, [colors]);

  const Circle = (props: any) => {
    const { id, isHovered = false } = props;
    return isHovered ? (
      <div
        id={id}
        className="w-4 h-4 rounded-full border-2 border-black bg-blue-300"
      />
    ) : (
      <div id={id} className="w-4 h-4 rounded-full border-2 border-black" />
    );
  };

  const Line = (props: any) => {
    const { id, isHovered = false } = props;
    return isHovered ? (
      <div id={id} className="w-1.5 bg-blue-300 h-[170px] min-h-[210px]" />
    ) : (
      <div id={id} className="w-1 bg-black h-[170px] min-h-[210px]" />
    );
  };

  const Timeline = (props: any) => {
    const { isHovered } = props;
    return (
      <div className="flex flex-col items-center h-[100%] min-h-[160px]">
        <Circle id="circle0" isHovered={isHovered} />
        <Line id="line0" isHovered={isHovered} />
      </div>
    );
  };

  const H1 = (props: any) => {
    return <div className="w-full text-lg font-bold">{...props.children}</div>;
  };

  const P = (props: any) => {
    return <div className="w-full text-md p-2">{...props.children}</div>;
  };

  const TimelineData = (props: any) => {
    const {
      header = "",
      description = "",
      start = null,
      end,
      link,
      imgSrc,
      left,
      setIsHovered,
      blockid,
    } = props;
    return (
      <div className="w-7/12 text-center">
        {start ? (
          <div
            id={blockid}
            className="flex justify-center h-[220px] rounded-xl py-8 transition-all duration-1500 ease-in-out"
            // onMouseEnter={() => setIsHovered(true)}
            // onMouseLeave={() => setIsHovered(false)}
          >
            <div className="w-3/4 text-center rounded-x">
              <a
                className="hover:underline"
                href={link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <H1>{header}</H1>
              </a>
              {start && (
                <P>
                  {start} - {end}
                </P>
              )}
              {left && (
                <div className="absolute transform translate-x-72 -translate-y-24">
                  <Image
                    src={imgSrc}
                    alt=""
                    width="64"
                    height="64"
                    className="rounded-lg"
                  />
                </div>
              )}
              {!left && (
                <div className="absolute transform -translate-x-8 -translate-y-24">
                  <Image
                    src={imgSrc}
                    alt=""
                    width="64"
                    height="64"
                    className="rounded-lg"
                  />
                </div>
              )}
              <P>{description}</P>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    );
  };

  function getScrollPercent() {
    var h = document.documentElement,
      b = document.body,
      st = "scrollTop",
      sh = "scrollHeight";

    var scrollPercent = Math.round(
      ((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100
    );

    const blockId = Math.floor(scrollPercent / 16.67);
    const block = document.getElementById(`${blockId}`);
    // if block exists set the background to blue
    console.log("Block:", block);
    Object.keys(data).forEach((key) => {
      const block = document.getElementById(`${key}`);
      if (key == blockId.toString()) {
        block?.classList.add("bg-blue-50");
      } else {
        block?.classList.remove("bg-blue-50");
      }
    });
  }

  // add event listener for scroll
  useEffect(() => {
    window.addEventListener("scroll", () => {
      getScrollPercent();
    });
  }, []);

  useEffect(() => {
    getScrollPercent();
  });

  const TimelineBlock = (props: any) => {
    const {
      header = "",
      description = "",
      left = true,
      start,
      end,
      link,
      imgSrc,
      blockid,
    } = props;
    // create new styling using the style prop
    const divStyle = "flex flex-row items-start w-full w-[900px]";
    const [isHovered, setIsHovered] = useState(false);

    return left ? (
      <div className={divStyle}>
        <TimelineData
          blockid={blockid}
          header={header}
          description={description}
          start={start}
          end={end}
          link={link}
          imgSrc={imgSrc}
          left={left}
          setIsHovered={setIsHovered}
        />
        <Timeline isHovered={isHovered} />
        <TimelineData />
      </div>
    ) : (
      <div className={divStyle}>
        <TimelineData />
        <Timeline isHovered={isHovered} />
        <TimelineData
          blockid={blockid}
          header={header}
          description={description}
          start={start}
          end={end}
          link={link}
          imgSrc={imgSrc}
          left={left}
          setIsHovered={setIsHovered}
        />
      </div>
    );
  };

  return (
    <div className="h-screen">
      <MenuBarContainer />
      <div className="flex flex-col justify-center items-center h-fit w-full pt-32 border-2">
        {Object.keys(data).map((key: any) => {
          return (
            <TimelineBlock
              name="timeline-block"
              blockid={`${key}`}
              key={key}
              header={data[key].name as string}
              description={data[key].description}
              start={data[key].start}
              end={data[key].end}
              left={key % 2 === 0}
              link={data[key].link}
              imgSrc={data[key].img}
            />
          );
        })}
        <Line />
      </div>
    </div>
  );
};

export default About;
