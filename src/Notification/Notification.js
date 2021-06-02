import React, { Component } from "react";
import Sidebar from "../components/Sidebar";
import "./Notification.css";
import Tables from "../components/TableNotification";
import { Table } from "reactstrap";
import ReactHtmlParser from 'react-html-parser';

const contactInformation = [ 
  {"color": "<div style=\"width:100%; height:15px; border:1px solid green; background-color: green;\"></div>",   "distance": "> 15 meters"}, 
  {"color": "<div style=\"width:100%; height:15px; border:1.5px solid black; background-color: yellow;\"></div>", "distance": "10-15 meters"},
  {"color": "<div style=\"width:100%; height:15px; border:1px solid DarkOrange; background-color: DarkOrange;\"></div>",  "distance": "3-9 meters"},
  {"color": "<div style=\"width:100%; height:15px; border:1px solid Crimson; background-color: Crimson;\"></div>", "distance": "< 3 meters"},
]

export default function Notification() {
  return (
    <div className="page">
      <div className="row" style={{ width: "100%" }}>
        <div className="col-auto">
          <Sidebar />
        </div>
        <div className="col">
          <div className="pageContent">
            <h1 style={{ color: "rgba(42, 157, 244)" }}>Notification</h1>
            <div className="boxMap">
              <div className="tableBox">
                <Tables />
              </div>
              <div className="contact-level-information-group">
                <div className="contact-level-infomation-heading">Contact Level Description</div>
                <div className="contact-level-infomation-content">
                  <Table style={{width: "15vw"}}>
                    <thead>
                      <tr>
                        <th>Color</th>
                        <th>Disatance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        contactInformation
                        .map((item, index) => (
                          <tr key={index}>
                            <td>{ReactHtmlParser(item.color)}</td>
                            <td>{item.distance}</td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </Table>
                </div>
            </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}


