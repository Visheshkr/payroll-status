import { Stack } from "@mui/material";
import Button from "@mui/material/Button";
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
import { Paper } from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React, { useRef, useState } from "react";
import ReactToPrint from "react-to-print";

export default function PaySlipPdf( {formData}) {
  let componentRef = useRef();
  const [paySlipFormData, setPaySlipFormData] = useState(formData);
  console.log(paySlipFormData,"formData");
  return (
    <Paper
    elevation={1}
    sx={{padding:2}}
      ref={(el) => {
        componentRef = el;
      }}
    >
      {/* <CardContent> */}
        <Stack direction="row" justifyContent="center">
          {/* <img alt="dtrs" src={logo} width="80" height="80" /> */}
          <Typography
            fontWeight="bold"
            sx={{ textAlign: "center", ml: 2, mr: 2 }}
          >
            STATE GOVERNMENT
            <br /> Pay-Slip For the 2024-June
          </Typography>
          {/* <img alt="DTRS Slip" src={userimg} width="80" height="80" /> */}
        </Stack>
        <Grid
          container
          xs={12}
          sm={12}
          md={12}
          lg={12}
          justify="flex-end"
          ml={0.1}
          marginTop={2}
          alignItems="center"
          rowSpacing={1}
          columnSpacing={1}
        >
          <Grid
            item
            xs={12}
            sm={1.5}
            md={1.5}
            lg={1.5}
          >
            <Typography >Employee Code</Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={0.2}
            md={0.2}
            lg={0.2}
          >:</Grid>
          <Grid
            item
            xs={12}
            sm={2.2}
            md={2.2}
            lg={2.2}
          //sx={{ border: "1px solid black" }}
          >
            <Typography>{paySlipFormData?.employeeCode}</Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={0.2}
            md={0.2}
            lg={0.2}
          ></Grid>
          <Grid
            item
            xs={12}
            sm={1.5}
            md={1.5}
            lg={1.5}
          // sx={{ bgcolor: "#286cb4" }}
          >
            <Typography >
              DOJ
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={0.2}
            md={0.2}
            lg={0.2}
          >:</Grid>
          <Grid
            item
            xs={12}
            sm={2.2}
            md={2.2}
            lg={2.2}
          //sx={{ border: "0.5px solid black" }}
          >
            <Typography>{paySlipFormData?.doj}</Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={0.2}
            md={0.2}
            lg={0.2}
          ></Grid>
          <Grid
            item
            xs={12}
            sm={1.5}
            md={1.5}
            lg={1.5}
          //  sx={{ bgcolor: "#286cb4" }}
          >
            <Typography >Bank Name</Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={0.2}
            md={0.2}
            lg={0.2}
          >:</Grid>
          <Grid
            item
            xs={12}
            sm={2.1}
            md={2.1}
            lg={2.1}
          //  sx={{ border: "1px solid black" }}
          >
            <Typography>{paySlipFormData?.bankName}</Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={1.5}
            md={1.5}
            lg={1.5}
          >
            <Typography >Employee Name</Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={0.2}
            md={0.2}
            lg={0.2}
          >:</Grid>
          <Grid
            item
            xs={12}
            sm={2.2}
            md={2.2}
            lg={2.2}
          //sx={{ border: "1px solid black" }}
          >
            <Typography>{paySlipFormData?.employeeName}</Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={0.2}
            md={0.2}
            lg={0.2}
          ></Grid>
          <Grid
            item
            xs={12}
            sm={1.5}
            md={1.5}
            lg={1.5}
          // sx={{ bgcolor: "#286cb4" }}
          >
            <Typography >
              GPF/PRAN
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={0.2}
            md={0.2}
            lg={0.2}
          >:</Grid>
          <Grid
            item
            xs={12}
            sm={2.2}
            md={2.2}
            lg={2.2}
          //sx={{ border: "0.5px solid black" }}
          >
            <Typography>{paySlipFormData?.gpfPranNo}</Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={0.2}
            md={0.2}
            lg={0.2}
          ></Grid>
          <Grid
            item
            xs={12}
            sm={1.5}
            md={1.5}
            lg={1.5}
          //  sx={{ bgcolor: "#286cb4" }}
          >
            <Typography >Bank A/C</Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={0.2}
            md={0.2}
            lg={0.2}
          >:</Grid>
          <Grid
            item
            xs={12}
            sm={2.1}
            md={2.1}
            lg={2.1}
          //  sx={{ border: "1px solid black" }}
          >
            <Typography>{paySlipFormData?.bankAccountNumber}</Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={1.5}
            md={1.5}
            lg={1.5}
          >
            <Typography >Current Office</Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={0.2}
            md={0.2}
            lg={0.2}
          >:</Grid>
          <Grid
            item
            xs={12}
            sm={2.2}
            md={2.2}
            lg={2.2}
          //sx={{ border: "1px solid black" }}
          >
            <Typography>{paySlipFormData?.currentOffice}</Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={0.2}
            md={0.2}
            lg={0.2}
          ></Grid>
          <Grid
            item
            xs={12}
            sm={1.5}
            md={1.5}
            lg={1.5}
          // sx={{ bgcolor: "#286cb4" }}
          >
            <Typography >
              PAN
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={0.2}
            md={0.2}
            lg={0.2}
          >:</Grid>
          <Grid
            item
            xs={12}
            sm={2.2}
            md={2.2}
            lg={2.2}
          //sx={{ border: "0.5px solid black" }}
          >
            <Typography>{paySlipFormData?.panNo}</Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={0.2}
            md={0.2}
            lg={0.2}
          ></Grid>
          <Grid
            item
            xs={12}
            sm={1.5}
            md={1.5}
            lg={1.5}
          //  sx={{ bgcolor: "#286cb4" }}
          >
            <Typography >Basic Rate</Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={0.2}
            md={0.2}
            lg={0.2}
          >:</Grid>
          <Grid
            item
            xs={12}
            sm={2.1}
            md={2.1}
            lg={2.1}
          //  sx={{ border: "1px solid black" }}
          >
            <Typography>{paySlipFormData?.basicRate}</Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={1.5}
            md={1.5}
            lg={1.5}
          >
            <Typography >Grade</Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={0.2}
            md={0.2}
            lg={0.2}
          >:</Grid>
          <Grid
            item
            xs={12}
            sm={2.2}
            md={2.2}
            lg={2.2}
          //sx={{ border: "1px solid black" }}
          >
            <Typography>{paySlipFormData?.grade}</Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={0.2}
            md={0.2}
            lg={0.2}
          ></Grid>
          <Grid
            item
            xs={12}
            sm={1.5}
            md={1.5}
            lg={1.5}
          // sx={{ bgcolor: "#286cb4" }}
          >
            <Typography >
              Service Type
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={0.2}
            md={0.2}
            lg={0.2}
          >:</Grid>
          <Grid
            item
            xs={12}
            sm={2.2}
            md={2.2}
            lg={2.2}
          //sx={{ border: "0.5px solid black" }}
          >
            <Typography>{paySlipFormData?.serviceType}</Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={0.2}
            md={0.2}
            lg={0.2}
          ></Grid>
          <Grid
            item
            xs={12}
            sm={1.5}
            md={1.5}
            lg={1.5}
          //  sx={{ bgcolor: "#286cb4" }}
          >
            <Typography >Designation</Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={0.2}
            md={0.2}
            lg={0.2}
          >:</Grid>
          <Grid
            item
            xs={12}
            sm={2.1}
            md={2.1}
            lg={2.1}
          //  sx={{ border: "1px solid black" }}
          >
            <Typography>{paySlipFormData?.designation}</Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={1.5}
            md={1.5}
            lg={1.5}
          >
            <Typography >IFSC Code</Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={0.2}
            md={0.2}
            lg={0.2}
          >:</Grid>
          <Grid
            item
            xs={12}
            sm={2.2}
            md={2.2}
            lg={2.2}
          //sx={{ border: "1px solid black" }}
          >
            <Typography>{paySlipFormData?.ifscCode}</Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={0.2}
            md={0.2}
            lg={0.2}
          ></Grid>
          <Grid
            item
            xs={12}
            sm={1.5}
            md={1.5}
            lg={1.5}
          // sx={{ bgcolor: "#286cb4" }}
          >
            <Typography >
              Date of Retirement
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={0.2}
            md={0.2}
            lg={0.2}
          >:</Grid>
          <Grid
            item
            xs={12}
            sm={2.2}
            md={2.2}
            lg={2.2}
          //sx={{ border: "0.5px solid black" }}
          >
            <Typography>{paySlipFormData?.dateOfRetirement}</Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={0.2}
            md={0.2}
            lg={0.2}
          ></Grid>
          <Grid
            item
            xs={12}
            sm={1.5}
            md={1.5}
            lg={1.5}
          //  sx={{ bgcolor: "#286cb4" }}
          >
            <Typography ></Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={0.2}
            md={0.2}
            lg={0.2}
          ></Grid>
          <Grid
            item
            xs={12}
            sm={2.1}
            md={2.1}
            lg={2.1}
          //  sx={{ border: "1px solid black" }}
          >
            <Typography></Typography>
          </Grid>
        </Grid>
        <Typography sx={{ textAlign: "center", fontWeight: 'bold', mt: 2 }}>
          ATTENDANCE
        </Typography>
        <Grid
          container
          xs={12}
          sm={12}
          md={12}
          lg={12}
          justify="flex-end"
          ml={0.1}
          marginTop={2}
          alignItems="center"
          rowSpacing={1}
          columnSpacing={1}
        >
          <Grid
            item
            xs={12}
            sm={3}
            md={3}
            lg={3}
            sx={{ border: "1px solid black", backgroundColor: '#F0F8FF' }}
          >
            <Typography >Total Days of Month</Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={3}
            md={3}
            lg={3}
            sx={{ border: "1px solid black", backgroundColor: '#F0F8FF' }}
          >
            <Typography >Paid Days</Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={3}
            md={3}
            lg={3}
            sx={{ border: "1px solid black", backgroundColor: '#F0F8FF' }}
          >
            <Typography >LWP</Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={3}
            md={3}
            lg={3}
            sx={{ border: "1px solid black", backgroundColor: '#F0F8FF' }}
          >
            <Typography >Total</Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={3}
            md={3}
            lg={3}
            sx={{ border: "1px solid black" }}
          >
            <Typography >0</Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={3}
            md={3}
            lg={3}
            sx={{ border: "1px solid black" }}
          >
            <Typography >0</Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={3}
            md={3}
            lg={3}
            sx={{ border: "1px solid black" }}
          >
            <Typography >0</Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={3}
            md={3}
            lg={3}
            sx={{ border: "1px solid black" }}
          >
            <Typography >0</Typography>
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          rowSpacing={0}
          columnSpacing={2}
          justify="flex-end"
          //  alignItems="center"
          sx={{ mt: 3 }}
        >
          {/* <div style={{ display: "flex", justifyContent: "center" }}> */}
          <Grid item xs={12} sm={6} md={6} lg={6}>
            {/* <div> */}
            <table
              style={{
                width: "100%",
                //borderCollapse: "collapse",
                border: "1px solid black",
              }}
            >
              <thead>
                <tr>
                  <th
                    style={{
                      border: "1px solid black",
                      padding: "8px",
                      textAlign: 'center',
                      backgroundColor: '#F0F8FF'
                    }}
                    colspan="2"
                  >
                    Earning
                  </th>
                </tr>
                <tr>
                  <th
                    style={{
                      border: "1px solid black",
                      padding: "8px",
                      textAlign: 'center',
                      backgroundColor: '#F0F8FF'
                    }}
                    colspan="1"
                  >
                    Item
                  </th>
                  <th
                    style={{
                      border: "1px solid black",
                      padding: "8px",
                      textAlign: 'center',
                      backgroundColor: '#F0F8FF'
                    }}
                    colspan="1"
                  >
                    Amount
                  </th>
                </tr>
              </thead>
              {/* <tbody>
                <tr  >
                  <td style={{
                    border: "1px solid black",
                    padding: "8px",
                    textAlign: 'center'
                  }}>
                    Grade Pay
                  </td>
                  <td style={{
                    border: "1px solid black",
                    padding: "8px",
                    textAlign: 'center'
                  }}>
                    0
                  </td>
                </tr>
                <tr  >
                  <td style={{
                    border: "1px solid black",
                    padding: "8px",
                    textAlign: 'center'
                  }}>
                    Basic Pay
                  </td>
                  <td style={{
                    border: "1px solid black",
                    padding: "8px",
                    textAlign: 'center'
                  }}>
                    {paySlipFormData?.paymentPayhead[1]?.payheadValue || 0}
                  </td>
                </tr>
                <tr  >
                  <td style={{
                    border: "1px solid black",
                    padding: "8px",
                    textAlign: 'center'
                  }}>
                    Dearness Allowance
                  </td>
                  <td style={{
                    border: "1px solid black",
                    padding: "8px",
                    textAlign: 'center'
                  }}>
                    {paySlipFormData?.paymentPayhead[3]?.payheadValue || 0}
                  </td>
                </tr>
                <tr  >
                  <td style={{
                    border: "1px solid black",
                    padding: "8px",
                    textAlign: 'center'
                  }}>
                    House Rent Allowance
                  </td>
                  <td style={{
                    border: "1px solid black",
                    padding: "8px",
                    textAlign: 'center'
                  }}>
                    0
                  </td>
                </tr>
                <tr  >
                  <td style={{
                    border: "1px solid black",
                    padding: "8px",
                    textAlign: 'center'
                  }}>
                    City Transport Allowance
                  </td>
                  <td style={{
                    border: "1px solid black",
                    padding: "8px",
                    textAlign: 'center'
                  }}>
                    0
                  </td>
                </tr>
                <tr  >
                  <td style={{
                    border: "1px solid black",
                    padding: "8px",
                    textAlign: 'center'
                  }}>
                    Medical Allowance
                  </td>
                  <td style={{
                    border: "1px solid black",
                    padding: "8px",
                    textAlign: 'center'
                  }}>
                    0
                  </td>
                </tr>
              </tbody> */}
              <tbody>
                {formData?.paymentPayhead.map((item) => (
                  <tr  key={item?.payheadId}>
                    <td style={{
                      border: "1px solid black",
                      padding: "8px",
                      textAlign: 'center'
                    }}>
                      {item?.payheadName}
                    </td>
                    <td style={{
                      border: "1px solid black",
                      padding: "8px",
                      textAlign: 'center'
                    }}>
                      {item?.payheadValue}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* </div> */}
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            {/* <div> */}
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                border: "1px solid black",
              }}
            >
              <thead>
                <tr>
                  <th
                    style={{
                      border: "1px solid black",
                      padding: "8px",
                      textAlign: 'center',
                      backgroundColor: '#F0F8FF'
                    }}
                    colspan="2"
                  >
                    Deduction
                  </th>
                </tr>
                <tr>
                  <th
                    style={{
                      border: "1px solid black",
                      padding: "8px",
                      textAlign: 'center',
                      backgroundColor: '#F0F8FF'
                    }}
                    colspan="1"
                  >
                    Item
                  </th>
                  <th
                    style={{
                      border: "1px solid black",
                      padding: "8px",
                      textAlign: 'center',
                      backgroundColor: '#F0F8FF'
                    }}
                    colspan="1"
                  >
                    Amount
                  </th>
                </tr>
              </thead>
              {/* <tbody>
                <tr  >
                  <td style={{
                    border: "1px solid black",
                    padding: "8px",
                    textAlign: 'center'
                  }}>
                    GIS State Govt. Employees
                  </td>
                  <td style={{
                    border: "1px solid black",
                    padding: "8px",
                    textAlign: 'center'
                  }}>
                    0
                  </td>
                </tr>
                <tr  >
                  <td style={{
                    border: "1px solid black",
                    padding: "8px",
                    textAlign: 'center'
                  }}>
                    NPS Contribution Employee
                  </td>
                  <td style={{
                    border: "1px solid black",
                    padding: "8px",
                    textAlign: 'center'
                  }}>
                    0
                  </td>
                </tr>
              </tbody> */}
              <tbody>
                {formData?.deductionPayhead?.map((item) => (
                  <tr  key={item?.payheadId}>
                  <td style={{
                    border: "1px solid black",
                    padding: "8px",
                    textAlign: 'center'
                  }}>
                    {item?.payheadName}
                  </td>
                  <td style={{
                    border: "1px solid black",
                    padding: "8px",
                    textAlign: 'center'
                  }}>
                    {item?.payheadValue}
                  </td>
                </tr>
                ))}
              </tbody>
            </table>
            {/* </div> */}
          </Grid>
          {/* </div> */}
        </Grid>
        <Typography sx={{ textAlign: "center", fontWeight: 'bold', mt: 2, mb: 2 }}>
          LOAN BALANCES
        </Typography>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            border: "1px solid black",
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  border: "1px solid black",
                  padding: "8px",
                  textAlign: 'center',
                  backgroundColor: '#F0F8FF'
                }}
              >
                Loan Type
              </th>
              <th
                style={{
                  border: "1px solid black",
                  padding: "8px",
                  textAlign: 'center',
                  backgroundColor: '#F0F8FF'
                }}
              >
                Loan Ref. No
              </th>
              <th
                style={{
                  border: "1px solid black",
                  padding: "8px",
                  textAlign: 'center',
                  backgroundColor: '#F0F8FF'
                }}
              >
                EMI Type
              </th>
              <th
                style={{
                  border: "1px solid black",
                  padding: "8px",
                  textAlign: 'center',
                  backgroundColor: '#F0F8FF'
                }}
              >
                No. EMIs Deducted(In Current Month)
              </th>
              <th
                style={{
                  border: "1px solid black",
                  padding: "8px",
                  textAlign: 'center',
                  backgroundColor: '#F0F8FF'
                }}
              >
                Amount Deducted(In CurrentMonth)
              </th>
              <th
                style={{
                  border: "1px solid black",
                  padding: "8px",
                  textAlign: 'center',
                  backgroundColor: '#F0F8FF'
                }}
              >
                Total EMI
              </th>
              <th
                style={{
                  border: "1px solid black",
                  padding: "8px",
                  textAlign: 'center',
                  backgroundColor: '#F0F8FF'
                }}
              >
                No. EMIs Already Paid
              </th>
            </tr>
          </thead>
          <tbody>
            <tr  >
              <td style={{
                border: "1px solid black",
                padding: "8px",
                textAlign: 'center'
              }}>
                House Building Loan
                Advance/Extension State 1
              </td>
              <td style={{
                border: "1px solid black",
                padding: "8px",
                textAlign: 'center'
              }}>
                0
              </td>
              <td style={{
                border: "1px solid black",
                padding: "8px",
                textAlign: 'center'
              }}>
                Principle
              </td>
              <td style={{
                border: "1px solid black",
                padding: "8px",
                textAlign: 'center'
              }}>
                0
              </td>
              <td style={{
                border: "1px solid black",
                padding: "8px",
                textAlign: 'center'
              }}>
                0
              </td>
              <td style={{
                border: "1px solid black",
                padding: "8px",
                textAlign: 'center'
              }}>
                0
              </td>
              <td style={{
                border: "1px solid black",
                padding: "8px",
                textAlign: 'center'
              }}>
                0
              </td>
            </tr>
          </tbody>
        </table>
        <Typography sx={{ textAlign: "center", fontWeight: 'bold', mt: 2, mb: 2 }}>
          AUTHORIZE / RECOVERY DETAILS
        </Typography>
        {/* <div> */}
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            border: "1px solid black",
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  border: "1px solid black",
                  padding: "8px",
                  textAlign: 'center',
                  backgroundColor: '#F0F8FF'
                }}
              >
                Payee ID/HOA ID
              </th>
              <th
                style={{
                  border: "1px solid black",
                  padding: "8px",
                  textAlign: 'center',
                  backgroundColor: '#F0F8FF'
                }}
              >
                Amount Deducted
              </th>
              <th
                style={{
                  border: "1px solid black",
                  padding: "8px",
                  textAlign: 'center',
                  backgroundColor: '#F0F8FF'
                }}
              >
                Account No.
              </th>
            </tr>
          </thead>
          <tbody>
            <tr  >
              <td style={{
                border: "1px solid black",
                padding: "8px",
                textAlign: 'center'
              }}>
                0
              </td>
              <td style={{
                border: "1px solid black",
                padding: "8px",
                textAlign: 'center'
              }}>
                0
              </td>
              <td style={{
                border: "1px solid black",
                padding: "8px",
                textAlign: 'center'
              }}>
                0
              </td>
            </tr>
          </tbody>
        </table>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            border: "1px solid black",
            marginTop: 35
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  border: "1px solid black",
                  padding: "8px",
                  textAlign: 'center',
                  backgroundColor: '#F0F8FF'
                }}
              >
                Gross Earnings
              </th>
              <th
                style={{
                  border: "1px solid black",
                  padding: "8px",
                  textAlign: 'center',
                  fontWeight: 'normal'
                }}
              >
                {paySlipFormData?.grossEarning}
              </th>
              <th
                style={{
                  border: "1px solid black",
                  padding: "8px",
                  textAlign: 'center',
                  backgroundColor: '#F0F8FF'
                }}
              >
                Gross Deduction
              </th>
              <th
                style={{
                  border: "1px solid black",
                  padding: "8px",
                  textAlign: 'center',
                  fontWeight: 'normal'
                }}
              >
                {paySlipFormData?.grossDeduction}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr  >
              <td style={{
                border: "1px solid black",
                padding: "8px",
                textAlign: 'center',
                backgroundColor: '#F0F8FF'
              }}>
                Rupees
              </td>
              <td style={{
                border: "1px solid black",
                padding: "8px",
                textAlign: 'center',
                fontWeight: 'normal'
              }}>
                {paySlipFormData?.netPayInWords}
              </td>
              <td style={{
                border: "1px solid black",
                padding: "8px",
                textAlign: 'center',
                backgroundColor: '#F0F8FF'
              }}>
                Net Pay
              </td>
              <td style={{
                border: "1px solid black",
                padding: "8px",
                textAlign: 'center',
                fontWeight: 'normal'
              }}>
                {paySlipFormData?.netPay}
              </td>
            </tr>
          </tbody>
        </table>
      {/* </CardContent> */}
      <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        sx={{ mt: 2 }}
      >
        <style>
          {`
            @media print {
              .no-print {
                display: none;
              }
                table{
                      width: "100%",
                      borderCollapse: "collapse",
                      border: "1px solid black",
                     }
                 th,td{
                        border: "1px solid black",border: "1px solid black",
                        padding: "8px",
                        textAlign:'center'
                      },
                  th{
                    backgroundColor :'#F0F8FF'
                    }
          }
           table{
                width: "100%",
                borderCollapse: "collapse",
                border: "1px solid black",
                }
            th,td{
                  border: "1px solid black",                            border: "1px solid black",
                  padding: "8px",
                  textAlign:'center'
                },
           th{
              backgroundColor :'#F0F8FF'
            }
            }`
          }
        </style>
        <ReactToPrint
          trigger={() => (
            <Button
              className="no-print"
              variant="contained"
              sx={{
                color: "white",
                backgroundColor: "#286cb4",
                ":hover": { color: "white", backgroundColor: "#286cb4" },
                borderRadius: "4px",
              }}
            >
              Print 
            </Button>
          )}
          content={() => componentRef}
        />
        {/* <Button
          variant="contained"
          className="no-print"
          sx={{
            color: "white",
            backgroundColor: "#286cb4",
            ":hover": { color: "white", backgroundColor: "#286cb4" },
            borderRadius: "4px",
          }}
         // onClick={() => navigate('-1')}
        >
          Close
        </Button> */}
      </Stack>
    </Paper>
  );
}
