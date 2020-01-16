import React, { Component } from "react";
import Header from "../partials/Header";
import HeaderFilter from "../Filter/HeaderFilter";
import Overview from "../Overview/Overview";

import ScrollBar from "react-perfect-scrollbar";
import Axios from "axios";
import { LoopCircleLoading, SolarSystemLoading } from 'react-loadingg';

import TestFilter from "./TestFilter";
import MoreOverview from "../Overview/MoreOverview/MoreOverview";


class Filter extends Component {

  constructor(props) {
    super(props)

    this.state = {
      // Categories: [{ category: "Ward No", dropdown: ["Ward no. 1", "Ward no. 2", "Ward no. 3"] },
      // { category: "Education", dropdown: ["Slc", "+2", "Bachelor", "Masters", "PHD"] },
      // { category: "Age", dropdown: ["18-30", "31-40", "41-50", "51-60"] },
      // { category: "Number of Family Members", dropdown: ["2", "3", "4", "5+"] },
      // ]
      Categories: [],
      filterparam: [],
      isTrue: true,
      multiselectIndex: 0,
      uniqueArray: [],
      morefilterparam: [],
      moreCategories: []
    }
  }

  clicked = () => {
    this.setState({
      isTrue: !this.state.isTrue
    })
  }

  moreFetchDropdown = () => {
    Axios.get("https://api.myjson.com/bins/78xpq")
      .then((res) => {
        let moredropdown=[];
        let id = 1
        Object.keys(res.data.data[0]).forEach((e,i) => {
          this.state.morefilterparam.push(e)
          moredropdown.push({id:id,dropdown:res.data.data[0][e],field:e})
          id++
        })
        // console.log(moredropdown)
        this.headerfiilter.storemoreselectedvalue()
        this.setState({ moreCategories: moredropdown })
      })
  }

  fetchdropdown = () => {
    Axios.get("http://139.59.67.104:8019/api/v1/unique")
      .then((response) => {
   
        let alldropdown=[];
        let id=1
        Object.keys(response.data.data[0]).forEach((e, i) => {

          this.state.filterparam.push(e)
          alldropdown.push({id:id,dropdown:response.data.data[0][e],field:e})
          id++

        })
        // console.log(alldropdown)
        this.headerfiilter.storeselectedvalue()
       

   



        // this.setState({ Categories: response.data.data[0] })
        this.setState({ Categories: alldropdown })


        // setTimeout(()=>{
        //   let cbox=document.getElementsByClassName("custom-control-input")
        //   console.log(cbox,"CBOX")
        //   var index=0;
        //   for(var i=0;i<cbox.length;i++){
        //     console.log(cbox[i],"e")
        //     cbox[i].id=index
        //     index++
        //   }
          
        //   let clabel=document.getElementsByClassName("custom-control-label")
         
        //   var ind=0;
        //   for(var i=0;i<clabel.length;i++){
        //     console.log(clabel[i],"e")
        //     clabel[i].htmlFor=ind
        //     ind++
        //   }
        // },2000)



      })
  }


  componentDidMount() {
    this.fetchdropdown()
    this.moreFetchDropdown()

   
    // cbox.map((e)=>console.log(e,"e"))
  

  }
  setUniqueID=()=>{
    let cbox=document.getElementsByClassName("custom-control-input")
    console.log(cbox,"CBOX")

  }


  render() {

    return (
      <aside className="sidebar ">
          <div className="card" style={{display:`${this.state.isTrue ? 'block':'none'}`}}>
            <Header />
            {/* <TestFilter /> */}
            <div>
              <ScrollBar component="div">
                <div className="card-body">

                  <HeaderFilter fetchedData={this.props.fetchedData} householdData={this.props.householdData} onApply={this.props.onApply}  ref={re => this.headerfiilter = re} filterparam={this.state.filterparam} Categories={this.state.Categories} morefilterparam={this.state.morefilterparam} moreCategories={this.state.moreCategories} />
                  <Overview clicked={this.clicked} />

                </div>
              </ScrollBar>

            </div>
          </div>
          <div className="card" style={{display:`${this.state.isTrue ? 'none':'block'}`}}>
            <MoreOverview clicked={this.clicked} householdData={this.props.householdData} />
          </div>
        {/* {!this.state.isTrue&&console.log("Success") && <MoreOverview />} */}
      </aside>
    );
  }
}
export default Filter;
