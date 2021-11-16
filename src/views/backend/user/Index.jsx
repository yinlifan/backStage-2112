import React, { Component } from 'react';
import { Breadcrumb, Button, PageHeader, Table, Tag, Space, Pagination } from 'antd';
import req from '../../../http/req'

class Index extends Component {
  state = {
    page: 1, // 
    total: '', //总的
    pagesize: '',
  }
  //  定义一个成员
  bread = JSON.parse(sessionStorage.getItem('bread'))
  render() {
    // 面包屑数据
    let pathname = this.props.location.pathname
    let crumb = []
    this.bread.forEach((el) => {
      if(el.auth_path === pathname){
        crumb = el.auth_bread.split(',')
      }
    })
    //  表格的列申明
    const columns = [
      {
        title: 'id', // 表头
        dataIndex: 'id', //要显示数据中的字段名称
        key: 'id',
      },
      {
        title: '用户名',
        dataIndex: 'username',
        key: 'username',
      },
      {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
        render:(text) => <a href={"mailto :" + text}>{text}</a> // render-数据加工处理函数。函数返回需要渲染的内容，参数一：当前字段对应的数据，参数二：当前字段所在行的整条数据

      },
      {
        title: '性别',
        dataIndex: 'gender',
        key: 'gender',
        render:(text) => {
          if(text === "1"){
            return <Tag color="blue">男</Tag>
          }
          if(text === "2"){
            return <Tag color="pink">女</Tag>
          }
          if(text === "3"){
            return <Tag color="grey">保密</Tag>
          }
        }
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render: (text) => {
          if(text === "1"){
            return <Tag color="green">正常</Tag>
          }
          if(text === "2"){
            return <Tag color="red">禁用</Tag>
          }
        }
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => {
          return <Space size='small'>
            <Button size='small'>编辑</Button>
            <Button size='small' type="danger">删除</Button>
          </Space>
        }
      },
      
    ];
    return (
      <>
      {/* 面包屑 */}
        <Breadcrumb separator=">">
          {
            crumb.map(el => {
              return <Breadcrumb.Item key={el}>{el}</Breadcrumb.Item>
            })
          }
        </Breadcrumb>
          {/* 页头 */}
          <PageHeader
            title="用户列表"
            extra={[
              <Button key="addbtn" type="primary">用户添加</Button>
            ]}
          />
          {/* 表格 ,表格需要加rowkey属性来生成行的key,否则报错！！*/}
          <Table dataSource={this.state.data} columns={columns} scroll={{y:400}} rowKey={record => record.id} pagination={false}/>
          {/* 分页 */}
          <div style={{textAlign:"right", marginTop: 10}}> 
          <Pagination  defaultCurrent={this.state.page} total={this.state.total} onChange={this.loadData}/>
          </div>
      </>
    );
  }
  //  组件挂载后
  componentDidMount () {
    this.loadData()
  }
  //  
  loadData = (page) => {
    req.get('https://reactapi.iynn.cn/api/users', {
      params:{
        page

      }
    })
    .then((res) => {
      if (res.data.errNo === 0) {
        //  数据拿到了
        this.setState({
          data : res.data.paginate.data,
          total: res.data.paginate.total
        })
      }
    })
  }
}

export default Index;
