import React from 'react'
import { Pagination } from 'antd';

const CustomPag = ({setPage,pageSize}) => {
    const pageChange =(page) =>{
        setPage(page)
        window.scroll(0,0);
    }
    return (
        <div style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: 10,
          }}>
             <Pagination   
                defaultPageSize={20} 
                total={pageSize}
                 onChange={pageChange} 
                 showSizeChanger = {false} 
                 showQuickJumper ={true} 
                 hideOnSinglePage = {true}/>
                 
        </div>
       
    )
}

export default CustomPag
