import {
    Grid
} from "@mui/material";
import React from "react";
import { ProgressBar, Step } from "react-step-progress-bar";
import "react-step-progress-bar/styles.css";
import "./MultiStepProgressBar.css";
const MultiStepProgressBar = ({ page, onPageNumberClick, disable }) => {
    var stepPercentage = 0;
    if (page === "pageone") {
        stepPercentage = 1;
    } else if (page === "pagetwo") {
        stepPercentage = 21;
    } else if (page === "pagethree") {
        stepPercentage = 41;
    } else if (page === "pagefour") {
        stepPercentage = 61;
    } else if (page === "pagefive") {
        stepPercentage = 81;
    } else if (page === "pagesix") {
        stepPercentage = 100;
    }
    else {
        stepPercentage = 0;
    }
    //  padding: "0px 130px",
    return (
        <Grid container sx={{ padding: "0px 50px", mt: 3, }} >
            <div id="progress" >
                <ProgressBar percent={stepPercentage}>
                    <Step>
                        {({ accomplished, index }) => (
                            <div
                                className={`indexedStep ${accomplished ? "accomplished" : null}`}
                                onClick={() => onPageNumberClick("1")}
                            //onClick={() => onPageNumberClick("1")}
                            >
                                {index + 1}
                            </div>
                        )}
                    </Step>
                    {disable === true ?
                        <Step>
                            {({ accomplished, index }) => (
                                <div
                                    className={`indexedStep ${accomplished ? "accomplished" : null}`}
                                    onClick={() => onPageNumberClick("2")}
                                // onClick={() => onPageNumberClick("3")}
                                >
                                    {index + 1}
                                </div>
                            )}
                        </Step>
                        :
                        <Step>
                            {({ accomplished, index }) => (
                                <div
                                    className={`indexedStep ${accomplished ? "accomplished" : null}`}
                                    onClick={() => disable === true ? '' : onPageNumberClick("2")}
                                >
                                    {index + 1}
                                </div>
                            )}
                        </Step>
                    }
                    {disable === true ?
                        <Step>
                            {({ accomplished, index }) => (
                                <div
                                    className={`indexedStep ${accomplished ? "accomplished" : null}`}
                                    onClick={() => onPageNumberClick("3")}
                                // onClick={() => onPageNumberClick("3")}
                                >
                                    {index + 1}
                                </div>
                            )}
                        </Step>
                        :
                        <Step>
                            {({ accomplished, index }) => (
                                <div
                                    className={`indexedStep ${accomplished ? "accomplished" : null}`}
                                    onClick={() => disable === true ? '' : onPageNumberClick("3")}
                                // onClick={() => onPageNumberClick("3")}
                                >
                                    {index + 1}
                                </div>
                            )}
                        </Step>
                    }
                    {disable === true ?
                        <Step>
                            {({ accomplished, index }) => (
                                <div
                                    className={`indexedStep ${accomplished ? "accomplished" : null}`}
                                    onClick={() => onPageNumberClick("4")}
                                // onClick={() => onPageNumberClick("3")}
                                >
                                    {index + 1}
                                </div>
                            )}
                        </Step>
                        :
                        <Step>
                            {({ accomplished, index }) => (
                                <div
                                    className={`indexedStep ${accomplished ? "accomplished" : null}`}
                                    //onClick={() => onPageNumberClick("4")}
                                    onClick={() => disable === true ? '' : onPageNumberClick("4")}
                                // onClick={() => onPageNumberClick("3")}
                                >
                                    {index + 1}
                                </div>
                            )}
                        </Step>
                    }
                    {disable === true ? <Step>
                        {({ accomplished, index }) => (
                            <div
                                className={`indexedStep ${accomplished ? "accomplished" : null}`}
                                onClick={() => onPageNumberClick("5")}
                            >
                                {index + 1}
                            </div>
                        )}
                    </Step>
                        :
                        <Step>
                            {({ accomplished, index }) => (
                                <div
                                    className={`indexedStep ${accomplished ? "accomplished" : null}`}
                                    onClick={() => onPageNumberClick("5")}
                                >
                                    {index + 1}
                                </div>
                            )}
                        </Step>
                    }
                    {disable === true ?
                        <Step>
                            {({ accomplished, index }) => (
                                <div
                                    className={`indexedStep ${accomplished ? "accomplished" : null}`}
                                    onClick={() => onPageNumberClick("6")}
                                // onClick={() => onPageNumberClick("3")}
                                >
                                    {index + 1}
                                </div>
                            )}
                        </Step>
                        :
                        <Step>
                            {({ accomplished, index }) => (
                                <div
                                    className={`indexedStep ${accomplished ? "accomplished" : null}`}
                                    //onClick={() => onPageNumberClick("4")}
                                    onClick={() => disable === true ? '' : onPageNumberClick("6")}
                                // onClick={() => onPageNumberClick("3")}
                                >
                                    {index + 1}
                                </div>
                            )}
                        </Step>
                    }

                </ProgressBar>
            </div>
        </Grid>
    );
};
export default MultiStepProgressBar;