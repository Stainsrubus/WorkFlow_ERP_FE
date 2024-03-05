import * as React from 'react';
import LinearProgress from '@mui/joy/LinearProgress';


export default function Loader() {
   
    return <>
<div className=' flex  px-56 justify-center items-center h-screen'>
<LinearProgress  variant="plain"size="sm"  color="danger"  />
 </div>
</>

}