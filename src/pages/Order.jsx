import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Navbar from "../components/SideNav";
import TopBar from "../components/TopBar";
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import "../style/Header.css";
import "../style/SideNav.css";
import "../style/Order.css";
import axios from "axios";

const OrderPage = ({ data }) => {
  const navigate = useNavigate();
  const [retrieved_orders, setOrders] = useState([]);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/orders"); // Adjust the URL if needed
        setOrders(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchOrders();
  }, []);

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

  // const orders = [
  //   {
  //     Order: 1,
  //     Date: "22 - 4 - 2024",
  //     Customer: "Tan Yan Ho",
  //     PaymentStatus: "Paid",
  //     Ordered_item: ["Nike shoes", "Nike bag", "Nike clothes"],
  //     Fulfilment: "Fulfilled",
  //   },
  //   {
  //     Order: 2,
  //     Date: "22 - 4 - 2024",
  //     Customer: "Tan Yan Ho",
  //     PaymentStatus: "Paid",
  //     Fulfilment: "UnFulfilled",
  //   },
  //   {
  //     Order: 3,
  //     Date: "22 - 4 - 2024",
  //     Customer: "Tan Yan Ho",
  //     PaymentStatus: "Paid",
  //     Fulfilment: "UnFulfilled",
  //   },
  //   {
  //     Order: 4,
  //     Date: "22 - 4 - 2024",
  //     Customer: "Tan Yan Ho",
  //     PaymentStatus: "Paid",
  //     Fulfilment: "UnFulfilled",
  //   },
  //   {
  //     Order: 5,
  //     Date: "22 - 4 - 2024",
  //     Customer: "Tan Yan Ho",
  //     PaymentStatus: "Paid"
  //     Fulfilment: "UnFulfilled",
  //   },
  // ];

  const orders = retrieved_orders.map((order, i) => {
    // Extracting relevant fields from the retrieved order object
    const {
      _id,
      orderDate,
      customer,
      payment_status,
      products,
      delivery_status,
    } = order;

    let date = new Date(orderDate);
    // Creating an object with the desired format
    const formattedOrder = {
      Order: `C${i}`, // Assuming _id is used as the order ID
      Date: date.toLocaleDateString(), // Assuming orderDate is a Date object
      Customer: customer.name, // Assuming customer is an object with a 'name' property
      PaymentStatus: payment_status,
      Ordered_item: products.map((product) => product.productName), // Assuming products is an array of products
      Fulfilment: delivery_status || "UnFulfilled", // Assuming delivery_status is present in the order object
    };
    i++;
    return formattedOrder;
  });

  const options = {
    selectableRows: false,
    filterType: "checkbox",
    onRowClick: (rowData, rowMeta) => {
      const orderId = retrieved_orders[rowMeta.dataIndex]._id;
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
    <ThemeProvider theme={theme}>
      <div className="min-h-[calc(100vh-90px)] flex flex-col md:flex-row">
        {!isSmallScreen && (
          <aside className="w-full md:w-[20%] customShadow">
            <Navbar />
          </aside>
        )}

        <main
          className={`w-full ${isSmallScreen ? "" : "md:w-[80%]"} mr-10 mt-10`}
        >
          {isSmallScreen && (
            <div className="fixed-top-bar">
              <TopBar />
            </div>
          )}

          <div className="flex justify-between items-center mt-5">
            <Header />
          </div>

          <div className="order-content">
            <div className="order-content-label">My Orders</div>
            <div>
              <MUIDataTable data={orders} columns={columns} options={options} />
            </div>
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
};

export default OrderPage;
