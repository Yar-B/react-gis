import React from "react";
import parcels_data from "../data/properties.json"



function JSONdata() {
  
  
  return (
    <div className = "JSONwrapper">
      <pre>
      <code>
        {JSON.stringify(parcels_data, null, 3)}
      </code>
      </pre>
    </div>
    );
}


export default JSONdata;
