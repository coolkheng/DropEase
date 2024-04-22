import React from "react";
import Header from "../components/Header"; // Import your Header component
import SideNav from "../components/SideNav"; // Import your SideNav component
import "../style/Header.css";
import "../style/SideNav.css";
import "../style/Order.css";
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

let username = "Goh Kah Kheng";

const OrderPage = ({ data }) => {
  const navigate = useNavigate();

  const columns = [
    "Order",
    "Date",
    "Customer",
    {
      name: "PaymentStatus",
      label: "Payment Status",
      options: {
        customBodyRender: (value) => (
          <div
            style={{
              borderRadius: 9999,
              padding: 8,
              backgroundColor: value === "Paid" ? "green" : "red",
              width: 70,
              textAlign: "center",
              fontFamily: "Raleway, sans-serif",
            }}
          >
            {value}
          </div>
        ),
      },
    },
    {
      name: "Fulfilment",
      label: "Fulfilment Status",
      options: {
        customBodyRender: (value) => (
          <div
            style={{
              borderRadius: 9999,
              padding: "8px 6px",
              backgroundColor: value === "Fulfilled" ? "green" : "red",
              width: 100,
              textAlign: "center",
              fontFamily: "Raleway, sans-serif",
            }}
          >
            {value}
          </div>
        ),
      },
    },
  ];

  const orders = [
    {
      Order: 1,
      Date: "22 - 4 - 2024",
      Customer: "Tan Yan Ho",
      PaymentStatus: "Paid",
      Ordered_item: ["Nike shoes", "Nike bag", "Nike clothes"],
      Fulfilment: "Fulfilled",
    },
    {
      Order: 2,
      Date: "22 - 4 - 2024",
      Customer: "Tan Yan Ho",
      PaymentStatus: "Paid",
      Fulfilment: "UnFulfilled",
    },
    {
      Order: 3,
      Date: "22 - 4 - 2024",
      Customer: "Tan Yan Ho",
      PaymentStatus: "Paid",
      Fulfilment: "UnFulfilled",
    },

    {
      Order: 4,
      Date: "22 - 4 - 2024",
      Customer: "Tan Yan Ho",
      PaymentStatus: "Paid",
      Fulfilment: "UnFulfilled",
    },

    {
      Order: 5,
      Date: "22 - 4 - 2024",
      Customer: "Tan Yan Ho",
      PaymentStatus: "Paid",
      Fulfilment: "UnFulfilled",
    },
  ];

  const options = {
    selectableRows: false,
    filterType: "checkbox",
    onRowClick: (rowData, rowMeta) => {
      console.log("Clicked row data:", rowData);
      console.log("Clicked row index:", rowMeta.dataIndex);
      const orderId = orders[rowMeta.dataIndex].Order; // Assuming each order has an 'id' property
      navigate(`/ordered-item/${orderId}`);
    },
  };

  const theme = createTheme({
    typography: {
      fontFamily: "Raleway",
      fontSize: 16,
    },
    palette: {
      background: {
        paper: "#424669",
        default: "#424669",
      },
      mode: "dark",
    },

    components: {
      MuiTableCell: {
        styleOverrides: {
          head: {
            padding: "2px 80px ",
          },

          body: {
            padding: "2px 65px",
          },
        },
      },
    },
  });

  return (
    <div>
      <Header username={username} />
      <SideNav />
      <div className="content">
        <div className="content-label">
          {" "}
          My Orders
          <div />
          <ThemeProvider theme={theme}>
            <MUIDataTable data={orders} columns={columns} options={options} />
          </ThemeProvider>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
