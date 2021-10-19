import React, { useState, useEffect } from "react";
import { fetchAllRecords, createRecord} from "../../redux/actions/record/actions";
import CircularProgress from '@mui/material/CircularProgress';


const Record = ()=>{
    const dispatch = useDispatch();
    const [dataRecords, setDataRecords]= useState([]);

    useEffect(() => {
        dispatch(fetchAllRecords((res)=>{
            setDataRecords(res);
        }));
    },[])


    if(dataRecords.length == 0) return <CircularProgress style={{
        marginTop: '10%',
        marginLeft: '45%'
    }} size={100} />;

    return(
        <>
            <Grid container>
                    <Grid item xs={12}>
                        
                    </Grid>
                </Grid>
        </>
    )

}