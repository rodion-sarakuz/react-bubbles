import React, { useState, useRef, useLayoutEffect } from "react";

import BubbleUI from "react-bubble-ui";
import "react-bubble-ui/dist/index.css";
import Circle from "./circle";
import "./bubbles.css";


export default function Bubbles(props) {
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });
// Get the value of "some_key" in eg "https://example.com/?some_key=some_value"


    const controls = [
        {
            type: "range",
            optionKey: "size",
            min: 50,
            max: 300,
            step: 1,
            unit: "px",
            desc: "The maximum diameter of a bubble, in pixels",
            options1: {
                size: 50,
            },
            options2: {
                size: 100,
            },
            ref: useRef(null),
            range: {
                start: "minSize",
                end: "Infinity",
            },
        },
        {
            type: "range",
            optionKey: "minSize",
            min: 5,
            max: 50,
            step: 1,
            unit: "px",
            desc: "The minimum diameter of a bubble, in pixels",
            options1: {
                minSize: 5,
            },
            options2: {
                minSize: 20,
            },
            ref: useRef(null),
            range: {
                start: "0",
                end: "size",
            },
        },
        {
            type: "range",
            optionKey: "gutter",
            min: 0,
            max: 50,
            step: 1,
            unit: "px",
            desc: "The distance between individual bubbles, in pixels",
            options1: {
                gutter: 0,
            },
            options2: {
                gutter: 30,
            },
            ref: useRef(null),
            range: {
                start: "0",
                end: "Infinity",
            },
        },
        {
            type: "range",
            optionKey: "numCols",
            min: 1,
            max: 10,
            step: 1,
            desc:
                "The number of columns into which bubbles are organized. Rows are composed accordingly",
            options1: {
                numCols: 3,
            },
            options2: {
                numCols: 10,
            },
            ref: useRef(null),
            range: {
                start: "2",
                end: "len(children components)",
            },
        },
        {
            type: "range",
            optionKey: "xRadius",
            min: 50,
            max: 400,
            step: 1,
            unit: "px",
            desc:
                "The horizontal radius of the region where bubbles are at their maximum size, in pixels",
            options1: {
                xRadius: 50,
            },
            options2: {
                xRadius: 120,
            },
            ref: useRef(null),
            range: {
                start: "0",
                end: "Infinity",
            },
        },
        {
            type: "range",
            optionKey: "yRadius",
            min: 50,
            max: 400,
            step: 1,
            unit: "px",
            desc:
                "The vertical radius of the region where bubbles are at their maximum size, in pixels",
            options1: {
                yRadius: 50,
            },
            options2: {
                yRadius: 120,
            },
            ref: useRef(null),
            range: {
                start: "0",
                end: "Infinity",
            },
        },
        {
            type: "range",
            optionKey: "cornerRadius",
            min: 0,
            max: 400,
            step: 1,
            unit: "px",
            desc:
                "The amount by which the corners of the region where bubbles are at their maximum size are rounded, in pixels. If this value is equal to xRadius and yRadius, a circle inscribes the region",
            options1: {
                cornerRadius: 0,
            },
            options2: {
                cornerRadius: 100,
            },
            ref: useRef(null),
            range: {
                start: "0",
                end: "min(xRadius, yRadius)",
            },
        },
        {
            type: "range",
            optionKey: "fringeWidth",
            min: 20,
            max: 200,
            step: 1,
            unit: "px",
            desc:
                "The width of the fringe, or region just outside the center where bubbles grow from their minimum to maximum size, in pixels",
            options1: {
                fringeWidth: 40,
            },
            options2: {
                fringeWidth: 130,
            },
            ref: useRef(null),
            range: {
                start: "0",
                end: "Infinity",
            },
        },
        {
            type: "range",
            optionKey: "gravitation",
            min: 0,
            max: 10,
            step: 1,
            desc:
                "The amount, scaled 0 to 10, by which exterior bubbles are attracted to the center region",
            options1: {
                gravitation: 0,
            },
            options2: {
                gravitation: 9,
            },
            ref: useRef(null),
            range: {
                start: "0",
                end: "10",
            },
        },
        {
            type: "checkbox",
            optionKey: "showGuides",
            desc:
                "Whether or not the visual guides, including center region and fringe, are show over the bubbles. Useful when designing the bubble layout",
            options1: {
                showGuides: false,
            },
            options2: {
                showGuides: true,
            },
            ref: useRef(null),
        },
        {
            type: "checkbox",
            optionKey: "compact",
            desc:
                "Whether or not bubbles near the center region should fill in space wherever possible",
            options1: {
                compact: false,
            },
            options2: {
                compact: true,
            },
            ref: useRef(null),
        },
        // {
        //     type: "checkbox",
        //     optionKey: "provideProps",
        //     desc:
        //         "Whether or not bubbleSize, distanceToCenter, maxSize, and minSize values are passed to corresponding children as props",
        //     options1: {
        //         provideProps: false,
        //     },
        //     options2: {
        //         provideProps: true,
        //     },
        //     ref: useRef(null),
        // },
    ];
    const handleInputChange = (key, value) => {
        console.log(key, value);
        let newOptions = {};
        Object.assign(newOptions, options);
        newOptions[key] = value;
        console.log(newOptions);
        setOptions(newOptions);
    };

    // const [options, setOptions] = useState({
    //     size: params.size ?? 140,
    //     minSize: params.minSize ?? 15,
    //     gutter: params.gutter ?? 30,
    //     provideProps: params.provideProps ?? false,
    //     numCols: params.numCols ?? 6,
    //     fringeWidth: params.fringeWidth ?? 100,
    //     yRadius: params.yRadius ?? 160,
    //     xRadius: params.xRadius ?? 90,
    //     cornerRadius: params.cornerRadius ?? 100,
    //     showGuides: params.showGuides ?? false,
    //     compact: params.compact ?? false,
    //     gravitation: params.gravitation ?? 5
    // });
    const [options, setOptions] = useState({
        size: params.size != null ? parseInt(params.size) : 140,
        minSize: params.minSize != null ? parseInt(params.minSize) : 15,
        gutter: params.gutter != null ? parseInt(params.gutter) : 30,
        provideProps: params.provideProps != null ? (params.provideProps === 'true') : false,
        numCols:  params.numCols != null ? parseInt(params.numCols) : 6,
        fringeWidth: params.fringeWidth != null ? parseInt(params.fringeWidth) : 100,
        yRadius:  params.yRadius != null ? parseInt(params.yRadius) : 160,
        xRadius:  params.xRadius != null ? parseInt(params.xRadius) : 90,
        cornerRadius:  params.cornerRadius != null ? parseInt(params.cornerRadius) : 100,
        showGuides:  params.showGuides != null ? (params.showGuides === 'true') : false,
        compact: params.compact != null ? (params.compact === 'true') : false,
        gravitation:  params.gravitation != null ? parseInt(params.gravitation) : 5
    });




    const circles = [ ];
    const data = {
        names: [
            'Andreii, 26', 'Mark, 40', 'Anna, 29', 'Sam, 18', 'Fedir, 32','Anton, 26', 'Alex, 40', 'Anna, 29', 'Rodion, 32', 'Hanna, 40'
        ],
        distance: [
            '50 m', '100 m', '150 m', '200 m', '500 m', '1 km','2 km', '3 km', '4 km', '5 km', '7 km', '10 km'
        ],
        colors: [
            '#66B8F6', '#F6667C', '#5ED872', '#F6C666', '#66B8F6', '#F6667C', '#66B8F6', '#F6C666', '#F6C666', '#F6C666',
        ],
        emoji: [
            '🐶', '😍', '☕️', '❤️', '🔥', '⚽', '☂️', '👠', '🧢', '🎩'
        ]
    }
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    for (let i = 0; i < 70; i++) {
        let random = getRandomInt(9)

        circles.push(
            {
                id: i,
                name: data.names[getRandomInt(10)],
                img: "https://i.pravatar.cc/300?img="+i,
                emoji: data.emoji[random],
                color: data.colors[random],
                distance: data.distance[getRandomInt(12)],
                intention: getRandomInt(3) == 2 ? true : false

            }
        )
    }

    // const children = props.data.map((data, i) => {
    //     // return <Child data={data} className="child" key={i}>
    //     return 'dfdf'
    //         });

    function fallbackCopyTextToClipboard(text) {
        var textArea = document.createElement("textarea");
        textArea.value = text;

        // Avoid scrolling to bottom
        textArea.style.top = "0";
        textArea.style.left = "0";
        textArea.style.position = "fixed";

        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
            var successful = document.execCommand('copy');
            var msg = successful ? 'successful' : 'unsuccessful';
            console.log('Fallback: Copying text command was ' + msg);
        } catch (err) {
            console.error('Fallback: Oops, unable to copy', err);
        }

        document.body.removeChild(textArea);
    }
    function copyTextToClipboard(text) {
        if (!navigator.clipboard) {
            fallbackCopyTextToClipboard(text);
            return;
        }
        navigator.clipboard.writeText(text).then(function() {
            console.log('Async: Copying to clipboard was successful!');
        }, function(err) {
            console.error('Async: Could not copy text: ', err);
        });
    }
    function buildUrl(url, parameters){
        var qs = "";
        for(var key in parameters) {
            var value = parameters[key];
            qs += encodeURIComponent(key) + "=" + encodeURIComponent(value) + "&";
        }
        if (qs.length > 0){
            qs = qs.substring(0, qs.length-1); //chop off last "&"
            url = url + "?" + qs;
        }
        return url;
    }



            return (
                <div>
                <BubbleUI options={options} className="myBubbleUI">

                    {/*{children}*/}
                        {circles.map(item => <Circle key={item.id} data={item} />)}

                </BubbleUI>

                    <div className='controlls'>
                        {controls.map((control) => {
                            return (
                                <div className="control" key={control.optionKey}>
                                    <div className="top">
                                        <p className="controlTitle">{control.optionKey}:</p>
                                        <p
                                            className="controlValue"
                                            style={{
                                                width: control.type === "range" ? 50 : 0,
                                            }}
                                        >{`${
                                            control.type === "range" ? options[control.optionKey] : ""
                                            }${control.unit || ""}`}</p>

                                    </div>
                                    <div className="bottom">
                                        <input
                                            type={control.type}
                                            value={options[control.optionKey]}
                                            min={control.min}
                                            max={control.max}
                                            step={control.step}
                                            onChange={(event) => {
                                                handleInputChange(
                                                    control.optionKey,
                                                    control.type === "checkbox"
                                                        ? !options[control.optionKey]
                                                        : parseInt(event.target.value)
                                                );
                                            }}
                                            defaultChecked={options[control.optionKey]}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                        <button
                        onClick={() => {
                            const params = buildUrl(window.location.protocol + '//' +window.location.host+'/', options);
                            // const params = buildUrl('https:sarakuz.com/', options);
                            copyTextToClipboard(params)
                        }}
                        >Copy link</button>

                    </div>




                </div>
            )
};
