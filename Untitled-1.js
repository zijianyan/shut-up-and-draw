import { useState } from 'react';
function emilysFunctionalComponent() {
const [status, setStatus] = useState('testing react');
return (
  <div>
    <p> Current state is: {status} </p>
        <button type="submit" onClick={()=> setStatus({status: "tested"})}>
         Test
        </ button>
   </div>
  )
}
