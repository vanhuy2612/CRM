import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
class image extends Component{
    constructor(props){
        super(props)
    }
   
    render(){
        return(
            <Upload>
            <Button>
              <UploadOutlined /> Upload Image
            </Button>
          </Upload>
        )
    }
}
export default image