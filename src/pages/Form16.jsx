import { Grid,Card, CardContent } from '@mui/material'
import { Typography } from 'material-ui-core'
import React from 'react'

const style= {
    table: {
        border:'1px solid grey',
        width: '100%'
    },
    tr: {
        border: '1px solid grey',
        height:'30px'
    },
    th: {
        textAlign:'center',
        fontSize:'12px',
    },
    td: {
        textAlign:'center',
        fontSize:'10px',
        // height:'30px'
    }
}
const Form16 = () => {
  return (
    <div>
        <Card>
            <CardContent>
                {/* <table style={style.table} border="n">
                    <tr style = {style.tr}>
                        <th style = {{...style.th, fontSize:'16px'}} colspan="12">Form 16</th>
                    </tr>
                    <tr style={{border: '1px solid grey'}}>
                        <td style={style.td} colspan="12">[See rule 31(1)(a)]</td>
                    </tr>
                    <tr style = {style.tr}>
                        <th style = {{...style.th, fontSize:'16px'}} colspan="12">Part A</th>
                    </tr>
                    <tr style = {style.tr}>
                        <th style = {{...style.th}} colspan="12">Certificate under Section 203 of the Income-tax Act, 1961 for tax deducted at source on salary paid to an employee under section 192 or pension/interest income<br/>
                            of specified senior citizen under section 194P
                        </th>
                    </tr>
                    <tbody>
                        <tr style={style.tr}>
                            <th style={{ ...style.th,textAlign:'left',border:'1px solid grey' }}>Certificate : RMFOCIA</th>
                            <th style={{ ...style.th,textAlign:'right' }}>Last Updated On: 28-May-2024</th>
                        </tr>
                        <tr style={style.tr}>
                            <th style={{ ...style.th,textAlign:'center',border:'1px solid grey' }}>Name and address of the Employer/Specified Bank</th>
                            <th style={{ ...style.th,textAlign:'center' }}>Name and address of the Employee/Specified senior citizen</th>
                        </tr>
                        <tr style={style.tr}>
                            <td style={{ ...style.th,textAlign:'justify',border:'1px solid grey',padding:'20px 40px'}}>
                                KPMG INDIA SERVICES LLP <br/>
                                8TH FLOOR, TOWER C ,BUILDING NO -10, DLF PHASE-2, <br/>
                                DLF CYBER CITY, GURGAON - 122002 <br/>
                                Haryana <br/>
                                +(91)124-3345127111 <br/>
                                GIRRAJ@KPMG.COM
                            </td>
                            <td style={{ ...style.th,textAlign:'justify',padding:'20px 40px'}}>
                                CHIRANJIT DEY <br/>
                                KSHUDIRAM SARANI, YUBASHREE CLUB, YUBASHREE MORE,<br/>
                                BALURGHAT, SOUTH DINAJPUR - 733101 West Bengal <br/>
                            </td>
                        </tr>
                        <tr style={{...style.tr}}>
                            <td style={{ ...style.td, border: '1px solid grey'}}>
                                <th style={{...style.th}} >PAN of Deductor</th>
                            </td>
                            <td style={{ ...style.td, border: '1px solid grey'}}>
                                <th style={{...style.th}}>TAN of the Deductor</th>
                            </td>
                            <td style={{ ...style.td, textAlign: 'center', border: '1px solid grey'}}>
                                <th style={{...style.th, textAlign:'justify'}}>
                                    PAN of the
                                    Employee/Specified senior
                                    citizen
                                </th>
                            </td>
                            <td style={{ ...style.td, textAlign: 'center', border: '1px solid grey',}}>
                                <th style={{...style.th, textAlign:'justify'}}>
                                    Employee Reference No. provided by the
                                    Employer/Pension Payment order no. provided
                                    by the Employer (If available)
                                </th>
                            </td>
                        </tr>
                        <tr style={{...style.tr, width:'100%', border:'1px solid black'}}>
                            <td style={{ ...style.td, textAlign: 'center', border: '1px solid grey', width: '50%', padding:'10px 30px'}}>
                                <td style={{...style.th, borderRight:'1px solid grey', width:'5%'}}>AAKFK8108R</td>
                                <td style={{...style.th, width:'5%',}}>RTKK06828D</td>
                            </td>
                            <td style={{ ...style.td, textAlign: 'center', border: '1px solid grey', width: '50%', padding:'10px 30px'}}>
                                <td style={{...style.th, borderRight:'1px solid grey', width:'5%'}}>
                                    HQOPD1058N
                                </td>
                                <td style={{...style.th, width:'5%', textAlign:'center'}}>
                                    abcddasda
                                </td>
                            </td>
                        </tr>
                        <tr style={{...style.tr, width:'100%'}}>
                            <td style={{ ...style.td, textAlign: 'center', border: '1px solid grey', width: '50%', padding:'10px 30px'}}>
                                <th style={{...style.th, textAlign:'center', width:'10%'}}>CIT (TDS)</th>
                            </td>
                            <td style={{ ...style.td, textAlign: 'center', border: '1px solid grey', width: '50%', padding:'10px 30px'}}>
                                <th style={{...style.th, borderRight:'1px solid grey', width:'10%', textAlign:'center'}}>
                                Assessment Year
                                </th>
                                <th style={{...style.th, width:'10%', textAlign:'center'}}>
                                    Period with the Employer
                                </th>
                            </td>
                        </tr>
                    </tbody>
                </table> */}

                <Grid container sx={{border:'1px solid grey'}}>
                    <Grid item xs={12} sm={12} sx={{width:'100%', border:'1px solid grey', display:'flex', justifyContent:'center'}}>
                        <Typography sx={{fontSize:'16px'}}>FORM NO. 16</Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} sx={{width:'100%', border:'1px solid grey',display:'flex', justifyContent:'center'}}>
                        <Typography sx={{fontSize:'16px'}}>[See rule 31(1)(a)]</Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} sx={{width:'100%', border:'1px solid grey', display:'flex', justifyContent:'center'}}>
                        <Typography sx={{fontSize:'16px'}}>Part A</Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} sx={{width:'100%', border:'1px solid grey', display:'flex', justifyContent:'center'}}>
                        <h5 style={{fontSize:'14px', textAlign:'center'}} >Certificate under Section 203 of the Income-tax Act, 1961 for tax deducted at source on salary paid to an employee under section 192 or pension/interest income<br/>
                            of specified senior citizen under section 194P</h5>
                    </Grid>

                    <Grid container sx={{display:'flex'}}>
                        <Grid xs={6} sm={6} sx={{border:'1px solid grey',display:'flex', justifyContent:'start'}}>
                            <p>Certificate No. : RMFOCIA</p>
                        </Grid>
                        <Grid xs={6} sm={6} sx={{border:'1px solid grey', display:'flex',  justifyContent:'end',}}>
                            <p>Last Updated On: 28-May-2024</p>
                        </Grid>
                    </Grid>
                    <Grid container sx={{display:'flex'}}>
                        <Grid xs={6} sm={6} sx={{border:'1px solid grey',display:'flex', justifyContent:'center'}}>
                            <p>Name and address of the Employer/Specified Bank</p>
                        </Grid>
                        <Grid xs={6} sm={6} sx={{border:'1px solid grey', display:'flex',  justifyContent:'center',}}>
                            <p>Name and address of the EMployee/Specified senior citizen</p>
                        </Grid>
                    </Grid>
                    <Grid container sx={{display:'flex'}}>
                        <Grid xs={6} sm={6} sx={{border:'1px solid grey',display:'flex', justifyContent:'start'}}>
                            <p>
                                KPMG INDIA SERVICES LLP <br/>
                                8TH FLOOR, TOWER C ,BUILDING NO -10, DLF PHASE-2, <br/>
                                DLF CYBER CITY, GURGAON - 122002 <br/>
                                Haryana <br/>
                                +(91)124-3345127111 <br/>
                                GIRRAJ@KPMG.COM
                            </p>
                        </Grid>
                        <Grid xs={6} sm={6} sx={{border:'1px solid grey', display:'flex',  justifyContent:'start',}}>
                            <p>
                            CHIRANJIT DEY <br/>
                                KSHUDIRAM SARANI, YUBASHREE CLUB, YUBASHREE MORE,<br/>
                                BALURGHAT, SOUTH DINAJPUR - 733101 West Bengal <br/>
                            </p>
                        </Grid>
                    </Grid>
                    <Grid container sx={{display:'flex'}}>
                        <Grid container sx={{display:'flex', width:'50%'}}>
                            <Grid item xs={6} sm={6} sx={{display:'flex', justifyContent:'center', alignItems:'center', border:'1px solid grey',}}>
                                <p>PAN of the Deductor</p>
                            </Grid>
                            <Grid item xs={6} sm={6} sx={{display:'flex', justifyContent:'center', alignItems:'center', border:'1px solid grey',}}>
                                <p>TAN of the Deductor</p>
                            </Grid>
                        </Grid>
                        <Grid container sx={{display:'flex', width:'50%'}}>
                            <Grid item xs={5} sm={5} sx={{display:'flex', justifyContent:'center', alignItems:'center', border:'1px solid grey',}}>
                                <p>PAN of the Employee/Specified senior citizen</p>
                            </Grid>
                            <Grid item xs={7} sm={7} sx={{display:'flex', justifyContent:'center', alignItems:'center', border:'1px solid grey',}}>
                                <p>Employee Reference No. provided by the Employee/Pension Payment order no. provided by the Employer (if applicable)</p>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid container sx={{display:'flex'}}>
                        <Grid container sx={{display:'flex', width:'50%'}}>
                            <Grid item xs={6} sm={6} sx={{display:'flex', justifyContent:'center', alignItems:'center', border:'1px solid grey',}}>
                                <p>AAKFK68108R</p>
                            </Grid>
                            <Grid item xs={6} sm={6} sx={{display:'flex', justifyContent:'center', alignItems:'center', border:'1px solid grey',}}>
                                <p>RTKK06828D</p>
                            </Grid>
                        </Grid>
                        <Grid container sx={{display:'flex', width:'50%'}}>
                            <Grid item xs={5} sm={5} sx={{display:'flex', justifyContent:'center', alignItems:'center', border:'1px solid grey',}}>
                                <p>HQOPD1058N</p>
                            </Grid>
                            <Grid item xs={7} sm={7} sx={{display:'flex', justifyContent:'center', alignItems:'center', border:'1px solid grey',}}>
                                <p></p>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container sx={{display:'flex'}}>
                        <Grid container sx={{display:'flex', width:'50%'}}>
                            <Grid item xs={12} sm={12} sx={{display:'flex', justifyContent:'center', alignItems:'center', border:'1px solid grey',}}>
                                <p>CIT (TDS)</p>
                            </Grid>
                            {/* <Grid item xs={6} sm={6} sx={{display:'flex', justifyContent:'center', alignItems:'center', border:'1px solid grey',}}>
                                <p>RTKK06828D</p>
                            </Grid> */}
                        </Grid>
                        <Grid container sx={{display:'flex', width:'50%'}}>
                            <Grid item xs={6} sm={6} sx={{display:'flex', justifyContent:'center', alignItems:'center', border:'1px solid grey',}}>
                                <p>Assesment Year</p>
                            </Grid>
                            <Grid item xs={6} sm={6} sx={{display:'flex', justifyContent:'center', alignItems:'center', border:'1px solid grey',}}>
                                <p>Period with the Employer</p>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container sx={{display:'flex'}}>
                        <Grid container sx={{display:'flex', width:'50%'}}>
                            <Grid item xs={12} sm={12} sx={{display:'flex', justifyContent:'center', alignItems:'center', border:'1px solid grey',}}>
                                <p>The Commissioner of Income Tax (TDS) C.R. BUilding, Sector 17. E, Himalaya Marg Chandigarh - 160017</p>
                            </Grid>
                            {/* <Grid item xs={6} sm={6} sx={{display:'flex', justifyContent:'center', alignItems:'center', border:'1px solid grey',}}>
                                <p>RTKK06828D</p>
                            </Grid> */}
                        </Grid>
                        <Grid container sx={{display:'flex', width:'50%'}}>
                            <Grid item xs={6} sm={6} sx={{display:'flex', justifyContent:'center', width:'50%', alignItems:'center', border:'1px solid grey',}}>
                                <p>2024-25</p>
                            </Grid>
                            <Grid sx={{display:'flex', width:'50%',}}>
                                <Grid item xs={6} sm={6} sx={{display:'flex', justifyContent:'center', alignItems:'center', border:'1px solid grey',}}>
                                    <Grid>
                                        <p style={{fontWeight:'bold'}}>From</p>
                                        <p>31-Jul-2023</p>
                                    </Grid>
                                </Grid>
                                <Grid item xs={6} sm={6} sx={{display:'flex', justifyContent:'center', alignItems:'center', border:'1px solid grey',}}>
                                    <Grid>
                                        <p style={{fontWeight:'bold'}}>To</p>
                                        <p>31-Mar-2023</p>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12} sx={{width:'100%', border:'1px solid grey', display:'flex', justifyContent:'center'}}>
                        <Typography sx={{fontSize:'16px'}}>
                            Summary of amount paid/credited and tax deducted at source thereon in respect of the employee
                        </Typography>
                    </Grid>
                    <Grid container sx={{display:'flex'}}>
                        <Grid item xs={2.4} sm={2.4} sx={{display:'flex', justifyContent:'center', alignItems:'center', border:'1px solid grey',}}>
                            <p>Quarter(s)</p>
                        </Grid>
                        <Grid item xs={2.4} sm={2.4} sx={{display:'flex', justifyContent:'center', alignItems:'center', border:'1px solid grey',}}>
                            <p>Receipt Number of original quarterly statements of TDS under sub-section (3) of Section 200</p>
                        </Grid>
                        <Grid item xs={2.4} sm={2.4} sx={{display:'flex', justifyContent:'center', alignItems:'center', border:'1px solid grey',}}>
                            <p>Amount paid/credited</p>
                        </Grid>
                        <Grid item xs={2.4} sm={2.4} sx={{display:'flex', justifyContent:'center', alignItems:'center', border:'1px solid grey',}}>
                            <p>Amount of tax deducted (Rs.)</p>
                        </Grid>
                        <Grid item xs={2.4} sm={2.4} sx={{display:'flex', justifyContent:'center', alignItems:'center', border:'1px solid grey',}}>
                            <p>Amount of tax deposited/remitted (Rs.)</p>
                        </Grid>
                    </Grid>
                    <Grid container sx={{display:'flex'}}>
                        <Grid item xs={2.4} sm={2.4} sx={{display:'flex', justifyContent:'center', alignItems:'center', border:'1px solid grey',}}>
                            <p>Q2</p>
                        </Grid>
                        <Grid item xs={2.4} sm={2.4} sx={{display:'flex', justifyContent:'center', alignItems:'center', border:'1px solid grey',}}>
                            <p>QVMCOCKA</p>
                        </Grid>
                        <Grid item xs={2.4} sm={2.4} sx={{display:'flex', justifyContent:'center', alignItems:'center', border:'1px solid grey',}}>
                            <p>84516.00</p>
                        </Grid>
                        <Grid item xs={2.4} sm={2.4} sx={{display:'flex', justifyContent:'center', alignItems:'center', border:'1px solid grey',}}>
                            <p>0.00</p>
                        </Grid>
                        <Grid item xs={2.4} sm={2.4} sx={{display:'flex', justifyContent:'center', alignItems:'center', border:'1px solid grey',}}>
                            <p>0.00</p>
                        </Grid>
                    </Grid>
                    <Grid container sx={{display:'flex'}}>
                        <Grid item xs={2.4} sm={2.4} sx={{display:'flex', justifyContent:'center', alignItems:'center', border:'1px solid grey',}}>
                            <p>Q3</p>
                        </Grid>
                        <Grid item xs={2.4} sm={2.4} sx={{display:'flex', justifyContent:'center', alignItems:'center', border:'1px solid grey',}}>
                            <p>QVOJYJJE</p>
                        </Grid>
                        <Grid item xs={2.4} sm={2.4} sx={{display:'flex', justifyContent:'center', alignItems:'center', border:'1px solid grey',}}>
                            <p>121000.00</p>
                        </Grid>
                        <Grid item xs={2.4} sm={2.4} sx={{display:'flex', justifyContent:'center', alignItems:'center', border:'1px solid grey',}}>
                            <p>0.00</p>
                        </Grid>
                        <Grid item xs={2.4} sm={2.4} sx={{display:'flex', justifyContent:'center', alignItems:'center', border:'1px solid grey',}}>
                            <p>0.00</p>
                        </Grid>
                    </Grid>
                    <Grid container sx={{display:'flex'}}>
                        <Grid item xs={2.4} sm={2.4} sx={{display:'flex', justifyContent:'center', alignItems:'center', border:'1px solid grey',}}>
                            <p>Q4</p>
                        </Grid>
                        <Grid item xs={2.4} sm={2.4} sx={{display:'flex', justifyContent:'center', alignItems:'center', border:'1px solid grey',}}>
                            <p>QVRLJFHDD</p>
                        </Grid>
                        <Grid item xs={2.4} sm={2.4} sx={{display:'flex', justifyContent:'center', alignItems:'center', border:'1px solid grey',}}>
                            <p>121000.00</p>
                        </Grid>
                        <Grid item xs={2.4} sm={2.4} sx={{display:'flex', justifyContent:'center', alignItems:'center', border:'1px solid grey',}}>
                            <p>0.00</p>
                        </Grid>
                        <Grid item xs={2.4} sm={2.4} sx={{display:'flex', justifyContent:'center', alignItems:'center', border:'1px solid grey',}}>
                            <p>0.00</p>
                        </Grid>
                    </Grid>
                    <Grid container sx={{display:'flex'}}>
                        <Grid item xs={2.4} sm={2.4} sx={{display:'flex', justifyContent:'center', alignItems:'center', border:'1px solid grey',}}>
                            <p>Total</p>
                        </Grid>
                        <Grid item xs={2.4} sm={2.4} sx={{display:'flex', justifyContent:'center', alignItems:'center', border:'1px solid grey',}}>
                            <p></p>
                        </Grid>
                        <Grid item xs={2.4} sm={2.4} sx={{display:'flex', justifyContent:'center', alignItems:'center', border:'1px solid grey',}}>
                            <p>326516.00</p>
                        </Grid>
                        <Grid item xs={2.4} sm={2.4} sx={{display:'flex', justifyContent:'center', alignItems:'center', border:'1px solid grey',}}>
                            <p>0.00</p>
                        </Grid>
                        <Grid item xs={2.4} sm={2.4} sx={{display:'flex', justifyContent:'center', alignItems:'center', border:'1px solid grey',}}>
                            <p>0.00</p>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12} sx={{width:'100%', border:'1px solid grey'}}>
                        <p style={{fontSize:'14px', fontWeight:'bold', textAlign:'center'}}>
                            I.DETAILS OF TAX DEDUCTED AND DEPOSITED IN THE CENTRAL GOVERNMENT ACCOUNT THROUGH BOOK ADJUSTMENT
                        </p>
                        <p style={{fontSize:'12px',  textAlign:'center'}}>
                            (The deductor to provide payment wise details of tax deducted and deposited with respect to the deductee)
                        </p>
                    </Grid>
                    <Grid container>
                        <Grid item xs={2} sm={2} sx={{border:'1px solid grey', display:'flex', alignItems:'center',  justifyContent:'center'}}>
                            <p style={{textAlign:'center'}}>Sl. No</p>
                        </Grid>
                        <Grid item xs={3} sm={3} sx={{border:'1px solid grey', display:'flex', alignItems:'center',  justifyContent:'center'}}>
                            <p style={{textAlign:'center'}}>Tax Deposited in respect of the deductee (Rs.)</p>
                        </Grid>
                        <Grid item xs={7} sm={7}>
                            <Grid item xs={12} sm={12} sx={{border:'1px solid grey', display:'flex', alignItems:'center',  justifyContent:'center'}}>
                                <p style={{textAlign:'center'}}>Book Identification Number (BIN)</p>
                            </Grid>
                            <Grid item xs={12} sm={12} sx={{display:'flex'}}>
                                <Grid item xs={3} sm={3} sx={{border:'1px solid grey', display:'flex', justifyContent:'center', alignItems:'center'}}>
                                    <p style={{textAlign:'center'}}>Receipt Numbers of FormNo. 24G</p>
                                </Grid>
                                <Grid item xs={3} sm={3} sx={{border:'1px solid grey', display:'flex', alignItems:'center',  justifyContent:'center'}}>
                                    <p style={{textAlign:'center'}}>DDO serial number in Form no.24G</p>
                                </Grid>
                                <Grid item xs={3} sm={3} sx={{border:'1px solid grey', display:'flex', justifyContent:'center', alignItems:'center'}}>
                                    <p style={{textAlign:'center'}}>Date of transfer voucher(dd/mm/yyyy)</p>
                                </Grid>
                                <Grid item xs={3} sm={3} sx={{border:'1px solid grey', display:'flex', alignItems:'center', justifyContent:'center'}}>
                                    <p style={{textAlign:'center'}}>Status of matching with Form no. 24G</p>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={2} sm={2} sx={{border:'1px solid grey',display:'flex', alignItems:'center', justifyContent:'center'}}>
                            <p style={{textAlign:'center'}}>Total (Rs.)</p>
                        </Grid>
                        <Grid item xs={3} sm={3} sx={{border:'1px solid grey'}}>
                            {/* <p>Tax Deposited in respect of the deductee (Rs.)</p> */}
                        </Grid>
                        <Grid item xs={7} sm={7}>
                            <Grid item xs={12} sm={12} sx={{border:'1px solid grey'}}>
                                {/* <p>Book Identification Number (BIN)</p> */}
                            </Grid>
                            <Grid item xs={12} sm={12} sx={{display:'flex',}}>
                                <Grid item xs={3} sm={3} sx={{border:'1px solid grey', backgroundColor:'grey', height:'40px'}}>
                                    {/* <div style={{height:'inherit'}}></div> */}
                                </Grid>
                                <Grid item xs={3} sm={3} sx={{border:'1px solid grey',  backgroundColor:'grey'}}>
                                    {/* <p style={{display:'none'}}>DDO serial number in Form no.24G</p> */}
                                </Grid>
                                <Grid item xs={3} sm={3} sx={{border:'1px solid grey',  backgroundColor:'grey'}}>
                                    {/* <p style={{display:'none'}}>Date of transfer voucher(dd/mm/yyyy)</p> */}
                                </Grid>
                                <Grid item xs={3} sm={3} sx={{border:'1px solid grey',  backgroundColor:'grey'}}>
                                    {/* <p style={{display:'none'}}>Status of matching with Form no. 24G</p> */}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12} sx={{width:'100%', border:'1px solid grey'}}>
                        <p style={{fontSize:'14px', fontWeight:'bold', textAlign:'center'}}>
                            II. DETAILS OF TAX DEDUCTED AND DEPOSITED IN THE CENTRAL GOVERNMENT ACCOUNT THROUGH CHALLAN
                        </p>
                        <p style={{fontSize:'12px',  textAlign:'center'}}>
                            (The deductor to provide payment wise details of tax deducted and deposited with respect to the deductee)
                        </p>
                    </Grid>
                    <Grid container>
                        <Grid item xs={2} sm={2} sx={{border:'1px solid grey', display:'flex', alignItems:'center',  justifyContent:'center'}}>
                            <p style={{textAlign:'center'}}>Sl. No</p>
                        </Grid>
                        <Grid item xs={3} sm={3} sx={{border:'1px solid grey', display:'flex', alignItems:'center',  justifyContent:'center'}}>
                            <p style={{textAlign:'center'}}>Tax Deposited in respect of the deductee (Rs.)</p>
                        </Grid>
                        <Grid item xs={7} sm={7}>
                            <Grid item xs={12} sm={12} sx={{border:'1px solid grey', display:'flex', alignItems:'center',  justifyContent:'center'}}>
                                <p style={{textAlign:'center'}}>Challan Identification Number (CIN)</p>
                            </Grid>
                            <Grid item xs={12} sm={12} sx={{display:'flex'}}>
                                <Grid item xs={3} sm={3} sx={{border:'1px solid grey', display:'flex', justifyContent:'center', alignItems:'center'}}>
                                    <p style={{textAlign:'center'}}>BSR Code of the Bank Branch</p>
                                </Grid>
                                <Grid item xs={3} sm={3} sx={{border:'1px solid grey', display:'flex', alignItems:'center',  justifyContent:'center'}}>
                                    <p style={{textAlign:'center'}}>Date on which Tax deposited(dd/mm/yyyy)</p>
                                </Grid>
                                <Grid item xs={3} sm={3} sx={{border:'1px solid grey', display:'flex', justifyContent:'center', alignItems:'center'}}>
                                    <p style={{textAlign:'center'}}>Challan Serial Number</p>
                                </Grid>
                                <Grid item xs={3} sm={3} sx={{border:'1px solid grey', display:'flex', alignItems:'center', justifyContent:'center'}}>
                                    <p style={{textAlign:'center'}}>Status of matching with OLTAS*</p>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* loop over the data and print it in a table format just like below */}
                    <Grid container>
                        <Grid item xs={2} sm={2} sx={{border:'1px solid grey', display:'flex', alignItems:'center',  justifyContent:'center'}}>
                            <p style={{textAlign:'center'}}>1</p>
                        </Grid>
                        <Grid item xs={3} sm={3} sx={{border:'1px solid grey', display:'flex', alignItems:'center',  justifyContent:'center'}}>
                            <p style={{textAlign:'center'}}>0.00</p>
                        </Grid>
                        <Grid item xs={7} sm={7}>
                            {/* <Grid item xs={12} sm={12} sx={{border:'1px solid grey', display:'flex', alignItems:'center',  justifyContent:'center'}}>
                                <p style={{textAlign:'center'}}>Challan Identification Number (CIN)</p>
                            </Grid> */}
                            <Grid item xs={12} sm={12} sx={{display:'flex'}}>
                                <Grid item xs={3} sm={3} sx={{border:'1px solid grey', display:'flex', justifyContent:'center', alignItems:'center'}}>
                                    <p style={{textAlign:'center'}}>-</p>
                                </Grid>
                                <Grid item xs={3} sm={3} sx={{border:'1px solid grey', display:'flex', alignItems:'center',  justifyContent:'center'}}>
                                    <p style={{textAlign:'center'}}>07-09-2023</p>
                                </Grid>
                                <Grid item xs={3} sm={3} sx={{border:'1px solid grey', display:'flex', justifyContent:'center', alignItems:'center'}}>
                                    <p style={{textAlign:'center'}}>-</p>
                                </Grid>
                                <Grid item xs={3} sm={3} sx={{border:'1px solid grey', display:'flex', alignItems:'center', justifyContent:'center'}}>
                                    <p style={{textAlign:'center'}}>F</p>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={2} sm={2} sx={{border:'1px solid grey',display:'flex', alignItems:'center', justifyContent:'center'}}>
                            <p style={{textAlign:'center'}}>Total (Rs.)</p>
                        </Grid>
                        <Grid item xs={3} sm={3} sx={{border:'1px solid grey'}}>
                            {/* <p>Tax Deposited in respect of the deductee (Rs.)</p> */}
                        </Grid>
                        <Grid item xs={7} sm={7}>
                            <Grid item xs={12} sm={12} sx={{border:'1px solid grey'}}>
                                {/* <p>Book Identification Number (BIN)</p> */}
                            </Grid>
                            <Grid item xs={12} sm={12} sx={{display:'flex',}}>
                                <Grid item xs={3} sm={3} sx={{border:'1px solid grey', backgroundColor:'grey', height:'40px'}}>
                                    {/* <div style={{height:'inherit'}}></div> */}
                                </Grid>
                                <Grid item xs={3} sm={3} sx={{border:'1px solid grey',  backgroundColor:'grey'}}>
                                    {/* <p style={{display:'none'}}>DDO serial number in Form no.24G</p> */}
                                </Grid>
                                <Grid item xs={3} sm={3} sx={{border:'1px solid grey',  backgroundColor:'grey'}}>
                                    {/* <p style={{display:'none'}}>Date of transfer voucher(dd/mm/yyyy)</p> */}
                                </Grid>
                                <Grid item xs={3} sm={3} sx={{border:'1px solid grey',  backgroundColor:'grey'}}>
                                    {/* <p style={{display:'none'}}>Status of matching with Form no. 24G</p> */}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12} sx={{width:'100%', border:'1px solid grey'}}>
                        <p style={{fontSize:'14px', fontWeight:'bold', textAlign:'center'}}>
                            Verification
                        </p>
                    </Grid>
                    <Grid item xs={12} sm={12} sx={{width:'100%', border:'1px solid grey', padding:'10px 0px'}}>
                        <p style={{fontSize:'14px', fontWeight:'bold', textAlign:'justify'}}>
                        I, RACHNA AGGARWAL, son / daughter of RAMESH AGGARWAL working in the capacity of AUTHORIZED SIGNATORY (designation) do hereby certify that a sum of
                        Rs. 0.00 [Rs. Zero Only (in words)] has been deducted and a sum of Rs. 0.00 [Rs. Zero Only] has been deposited to the credit of the Central Government. I further
                        certify that the information given above is true, complete and correct and is based on the books of account, documents, TDS statements, TDS deposited and other
                        available records.
                        </p>
                    </Grid> 
                    <Grid container sx={{display:'flex'}}>
                        <Grid item xs={2} sm={2}>
                            <Grid item sx={{border:'1px solid grey', display:'flex', justifyContent:'start', alignItems:'center', paddingLeft:'10px'}}>
                                <p style={{fontWeight:'bold',  alignItems:'center',}}>Place</p>
                            </Grid>
                            <Grid sx={{border:'1px solid grey', display:'flex', justifyContent:'start', alignItems:'center',  paddingLeft:'10px'}}>
                                <p style={{fontWeight:'bold'}}>Date</p>
                            </Grid>
                        </Grid>
                        <Grid item xs={4} sm={4}>
                            <Grid item sx={{border:'1px solid grey', display:'flex', justifyContent:'center', alignItems:'center'}}>
                                <p>GURUGRAM</p>
                            </Grid>
                            <Grid sx={{border:'1px solid grey', display:'flex', justifyContent:'center', alignItems:'center'}}>
                                <p>01-Jun-2024</p>
                            </Grid>
                        </Grid>
                        <Grid item xs={6} sm={6} sx={{border:'1px solid grey', display:'flex', justifyContent:'center', alignItems:'flex-end'}}>
                            <p style={{fontWeight:'bold'}}>(Signature of the person)</p>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={6} sm={6} sx={{border:'1px solid grey', paddingLeft:'10px',display:'flex'}}>
                            <p style={{fontWeight:'bold'}}>Designation: &nbsp;</p><p>AUTHORIZED SIGNATORY</p>
                        </Grid>
                        <Grid item xs={6} sm={6} sx={{border:'1px solid grey', paddingLeft:'10px', display:'flex'}}>
                            <p style={{fontWeight:'bold'}}>Fullname: &nbsp;</p><p>RACHNA AGGARWAL</p>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12} sm={12} sx={{padding:'10px 0px'}}>
                        <p>
                        1. Part B (Annexure) of the certificate in Form No.16 shall be issued by the employer. <br/>
                        2. If an assessee is employed under one employer during the year, Part 'A' of the certificate in Form No.16 issued for the quarter ending on 31st March of the financial year shall contain the details
                            of tax deducted and deposited for all the quarters of the financial year. <br/>
                        3. If an assessee is employed under more than one employer during the year, each of the employers shall issue Part A of the certificate in Form No.16 pertaining to the period for which such
                        assessee was employed with each of the employers. Part B (Annexure) of the certificate in Form No. 16 may be issued by each of the employers or the last employer at the option of the assessee.<br/>
                        4. To update PAN details in Income Tax Department database, apply for 'PAN change request' through NSDL or UTITSL.<br/>
                        </p>
                    </Grid>
                </Grid>

                <Grid container>
                    <Grid item xs={12} sm={12} sx={{padding:'10px 0px'}}>
                        <p style={{textDecoration:'underline', fontWeight:'bold', fontSize:'14px'}}>
                            Legend used in Form 16
                        </p>
                    </Grid>
                </Grid>
                <Grid container sx={{display:'flex', backgroundColor:'#c9ebec'}}>
                    <Grid item xs={2} sm={2} sx={{border:'1px solid grey', display:'flex', justifyContent:'center', alignItems:'center'}}>
                        <span style={{fontWeight:'bold', fontSize:'14px'}}>Legend</span>
                    </Grid>
                    <Grid item xs={3} sm={3} sx={{border:'1px solid grey', display:'flex', justifyContent:'center', alignItems:'center'}}>
                        <span style={{fontWeight:'bold', fontSize:'14px'}}>Description</span>
                    </Grid>
                    <Grid item xs={7} sm={7} sx={{border:'1px solid grey', display:'flex', justifyContent:'center', alignItems:'center'}}>
                        <span style={{fontWeight:'bold', fontSize:'14px'}}>Definition</span>
                    </Grid>
                </Grid>
                <Grid container sx={{display:'flex'}}>
                    <Grid item xs={2} sm={2} sx={{border:'1px solid grey', display:'flex', justifyContent:'center', alignItems:'center'}}>
                        <span style={{fontSize:'12px'}}>U</span>
                    </Grid>
                    <Grid item xs={3} sm={3} sx={{border:'1px solid grey', display:'flex', justifyContent:'center', alignItems:'center'}}>
                        <span style={{fontSize:'12px'}}>Unmatched</span>
                    </Grid>
                    <Grid item xs={7} sm={7} sx={{border:'1px solid grey', display:'flex', justifyContent:'center', alignItems:'center'}}>
                        <span style={{fontSize:'12px', paddingLeft:'10px'}}>Deductors have not deposited taxes or have furnished incorrect particulars of tax payment. Final credit will be reflected only when payment
                        details in bank match with details of deposit in TDS / TCS statement</span>
                    </Grid>
                </Grid>
                <Grid container sx={{display:'flex'}}>
                    <Grid item xs={2} sm={2} sx={{border:'1px solid grey', display:'flex', justifyContent:'center', alignItems:'center'}}>
                        <span style={{fontSize:'12px'}}>P</span>
                    </Grid>
                    <Grid item xs={3} sm={3} sx={{border:'1px solid grey', display:'flex', justifyContent:'center', alignItems:'center'}}>
                        <span style={{fontSize:'12px'}}>Provisional</span>
                    </Grid>
                    <Grid item xs={7} sm={7} sx={{border:'1px solid grey', display:'flex', justifyContent:'center', alignItems:'center'}}>
                        <span style={{fontSize:'12px', paddingLeft:'10px'}}>Provisional tax credit is effected only for TDS / TCS Statements filed by Government deductors."P" status will be changed to Final (F) on
                        verification of payment details submitted by Pay and Accounts Officer (PAO)</span>
                    </Grid>
                </Grid>
                <Grid container sx={{display:'flex'}}>
                    <Grid item xs={2} sm={2} sx={{border:'1px solid grey', display:'flex', justifyContent:'center', alignItems:'center'}}>
                        <span style={{fontSize:'12px'}}>F</span>
                    </Grid>
                    <Grid item xs={3} sm={3} sx={{border:'1px solid grey', display:'flex', justifyContent:'center', alignItems:'center'}}>
                        <span style={{fontSize:'12px'}}>Final</span>
                    </Grid>
                    <Grid item xs={7} sm={7} sx={{border:'1px solid grey', display:'flex', justifyContent:'center', alignItems:'center'}}>
                        <span style={{fontSize:'12px', paddingLeft:'10px'}}>In case of non-government deductors, payment details of TDS / TCS deposited in bank by deductor have matched with the payment details
                        mentioned in the TDS / TCS statement filed by the deductors. In case of government deductors, details of TDS / TCS booked in Government
                        account have been verified by Pay & Accounts Officer (PAO)</span>
                    </Grid>
                </Grid>
                <Grid container sx={{display:'flex'}}>
                    <Grid item xs={2} sm={2} sx={{border:'1px solid grey', display:'flex', justifyContent:'center', alignItems:'center'}}>
                        <span style={{fontSize:'12px'}}>O</span>
                    </Grid>
                    <Grid item xs={3} sm={3} sx={{border:'1px solid grey', display:'flex', justifyContent:'center', alignItems:'center'}}>
                        <span style={{fontSize:'12px'}}>Overbooked</span>
                    </Grid>
                    <Grid item xs={7} sm={7} sx={{border:'1px solid grey', display:'flex', justifyContent:'center', alignItems:'center'}}>
                        <span style={{fontSize:'12px', paddingLeft:'10px'}}>Payment details of TDS / TCS deposited in bank by deductor have matched with details mentioned in the TDS / TCS statement but the
                        amount is over claimed in the statement. Final (F) credit will be reflected only when deductor reduces claimed amount in the statement or
                        makes new payment for excess amount claimed in the statement</span>
                    </Grid>
                </Grid>

                
                <Grid item xs={12} sm={12} sx={{height:'8px', backgroundColor:'grey', marginTop:'90vh'}}>
                </Grid>
                <Grid container sx={{border:'1px solid grey', marginTop:5}}>
                    <Grid item xs={12} sm={12} sx={{width:'100%', border:'1px solid grey', display:'flex', justifyContent:'center'}}>
                        <Typography sx={{fontSize:'16px'}}>FORM NO. 16</Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} sx={{width:'100%', border:'1px solid grey', display:'flex', justifyContent:'center'}}>
                        <Typography sx={{fontSize:'16px'}}>PART B</Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} sx={{width:'100%', border:'1px solid grey', display:'flex', justifyContent:'center'}}>
                        <h5 style={{fontSize:'14px', textAlign:'center'}} >Certificate under Section 203 of the Income-tax Act, 1961 for tax deducted at source on salary paid to an employee under section 192 or pension/interest income<br/>
                        of specified senior citizen under section 194P</h5>
                    </Grid>

                    <Grid container sx={{display:'flex'}}>
                        <Grid xs={6} sm={6} sx={{border:'1px solid grey',display:'flex', justifyContent:'start'}}>
                            <p>Certificate No. : RMFOCIA</p>
                        </Grid>
                        <Grid xs={6} sm={6} sx={{border:'1px solid grey', display:'flex',  justifyContent:'end',}}>
                            <p>Last Updated On: 28-May-2024</p>
                        </Grid>
                    </Grid>
                    <Grid container sx={{display:'flex'}}>
                        <Grid xs={6} sm={6} sx={{border:'1px solid grey',display:'flex', justifyContent:'center'}}>
                            <p>Name and address of the Employer/Specified Bank</p>
                        </Grid>
                        <Grid xs={6} sm={6} sx={{border:'1px solid grey', display:'flex',  justifyContent:'center',}}>
                            <p>Name and address of the EMployee/Specified senior citizen</p>
                        </Grid>
                    </Grid>
                    <Grid container sx={{display:'flex'}}>
                        <Grid xs={6} sm={6} sx={{border:'1px solid grey',display:'flex', justifyContent:'start'}}>
                            <p>
                                KPMG INDIA SERVICES LLP <br/>
                                8TH FLOOR, TOWER C ,BUILDING NO -10, DLF PHASE-2, <br/>
                                DLF CYBER CITY, GURGAON - 122002 <br/>
                                Haryana <br/>
                                +(91)124-3345127111 <br/>
                                GIRRAJ@KPMG.COM
                            </p>
                        </Grid>
                        <Grid xs={6} sm={6} sx={{border:'1px solid grey', display:'flex',  justifyContent:'start',}}>
                            <p>
                            CHIRANJIT DEY <br/>
                                KSHUDIRAM SARANI, YUBASHREE CLUB, YUBASHREE MORE,<br/>
                                BALURGHAT, SOUTH DINAJPUR - 733101 West Bengal <br/>
                            </p>
                        </Grid>
                        <Grid container sx={{display:'flex'}}>
                            <Grid item xs={4} sm={4} style={{display:'flex', justifyContent:'center', alignItems:'center',border:'1px solid grey'}}><p>PAN of the Deductor</p></Grid>
                            <Grid item xs={4} sm={4} style={{display:'flex', justifyContent:'center', alignItems:'center',border:'1px solid grey'}}><p>TAN of the Deductor</p></Grid>
                            <Grid item xs={4} sm={4} style={{display:'flex', justifyContent:'center', alignItems:'center',border:'1px solid grey'}}><p>PAN of the Employee/Specified senior citizen</p></Grid>
                        </Grid>
                        <Grid container sx={{display:'flex'}}>
                            <Grid item xs={4} sm={4} style={{display:'flex', justifyContent:'center', alignItems:'center',border:'1px solid grey'}}><p>AAKFK8108R</p></Grid>
                            <Grid item xs={4} sm={4} style={{display:'flex', justifyContent:'center', alignItems:'center',border:'1px solid grey'}}><p>RTKK06828D</p></Grid>
                            <Grid item xs={4} sm={4} style={{display:'flex', justifyContent:'center', alignItems:'center',border:'1px solid grey'}}><p>HQOPD1058N</p></Grid>
                        </Grid>
                        <Grid container sx={{display:'flex'}}>
                            <Grid item xs={6} sm={6} style={{display:'flex', justifyContent:'center', alignItems:'center',border:'1px solid grey'}}><p>CIT (TDS)</p></Grid>
                            <Grid item xs={3} sm={3} style={{display:'flex', justifyContent:'center', alignItems:'center',border:'1px solid grey'}}><p>Assessment Year</p></Grid>
                            <Grid item xs={3} sm={3} style={{display:'flex', justifyContent:'center', alignItems:'center',border:'1px solid grey'}}><p>Period with the Employer</p></Grid>
                        </Grid>

                        <Grid container sx={{display:'flex'}}>
                            <Grid item xs={6} sm={6} style={{display:'flex', justifyContent:'center', alignItems:'center',border:'1px solid grey'}}><p>The Commissioner of Income Tax (TDS) <br/> C.R. Building, Sector 17 . E, Himalaya Marg Chandigarh - 160017</p></Grid>
                            <Grid item xs={3} sm={3} style={{display:'flex', justifyContent:'center', alignItems:'center',border:'1px solid grey'}}><p>2024-25</p></Grid>
                            <Grid item xs={3} sm={3} style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                                <Grid item xs={6} sm={6} style={{border:'1px solid grey'}}>
                                    <p style={{fontWeight:'bold'}}>From</p>
                                    <p>31-Jul-2023</p>
                                </Grid>
                                <Grid item xs={6} sm={6} style={{border:'1px solid grey'}}>
                                    <p style={{fontWeight:'bold'}}>To</p>
                                    <p>31-Mar-2024</p>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    
                </Grid>
                <Grid container>
                    <Grid item xs={12} sm={12} sx={{display:'flex',justifyContent:'flex-end', marginTop:2}}>
                        <p style={{fontSize:'14px'}}>Annexure - I</p>
                    </Grid>
                </Grid>

                <Grid container sx={{border:'1px solid grey'}}>
                    <Grid item xs={12} sm={12} sx={{border:'1px solid grey'}}>
                        <p>Details of Salary Paid and any other income and tax deducted</p>
                    </Grid>
                    <Grid container>
                        <Grid item xs={2} sm={2} sx={{border:'1px solid grey', display:'flex', justifyContent:'center'}}>
                            <p>A</p>
                        </Grid>
                        <Grid item xs={6} sm={6} sx={{border:'1px solid grey'}}>
                            <p>Whether opting out of taxation u/s 115BAC(1A)?</p>
                        </Grid>
                        <Grid item xs={4} sm={4} sx={{border:'1px solid grey', display:'flex', justifyContent:'center'}}>
                            <p>No</p>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={2} sm={2} sx={{border:'1px solid grey', display:'flex', justifyContent:'center'}}>
                            <p>1.</p>
                        </Grid>
                        <Grid item xs={6} sm={6} sx={{border:'1px solid grey'}}>
                            <p>Gross Salary?</p>
                        </Grid>
                        <Grid item xs={4} sm={4} sx={{display:'flex', justifyContent:'center'}}>
                            <Grid xs={6} sm={6} sx={{border:'1px solid grey',}}>
                                <p>Rs.</p>
                            </Grid>
                            <Grid xs={6} sm={6} sx={{border:'1px solid grey',}}>
                                <p>Rs.</p>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    </div>
  )
}

export default Form16
