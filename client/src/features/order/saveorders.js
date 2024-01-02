import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
const EXCEL_TYPE =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const EXCEL_EXTENSION = ".xlsx";

function filterData(data) {
  const options = { day: "numeric", month: "short", year: "numeric" };
  return data
    .map((item) => {
      return item.products.map((product) => {
        return {
          userName: `${item.user.firstname} ${item.user.lastname}`,
          userEmail: `${item.user.email}`,
          productName: product.productData.title,
          productPrice: product.productData.price,
          productQuantity: product.quantity,
          productSubtotal: product.subtotal,
          paymentStatus: item.payment.payment_status,
          orderStatus: item.orderstatus,
          orderDate: new Date(item.createdAt).toLocaleTimeString(
            "en-US",
            options
          ),
          address: `${item.address.street}, ${item.address.city}, ${item.address.state},  ${item.address.country}, ${item.address.zipCode},  ${item.address.contact}`,
        };
      });
    })
    .flat();
}
export const saveToExcel = (data) => {
  const filteredData = filterData(data);
  const worksheet = XLSX.utils.json_to_sheet(filteredData);
  const workbook = {
    Sheets: {
      data: worksheet,
    },
    SheetNames: ["data"],
  };
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  saveAsExcel(excelBuffer, "OrderSummary");
};
function saveAsExcel(buffer, filename) {
  const data = new Blob([buffer], { type: EXCEL_TYPE });
  saveAs(data, filename + new Date().getDate() + EXCEL_EXTENSION);
}

export const jsonToCsv = (data) => {
  const filteredData = filterData(data);
  const headers = Object.keys(filteredData[0]).toString();
  const values = filteredData.map((items) => {
    return Object.values(items).toString();
  });
  const csvData = [headers, ...values].join("\n");
  saveToCsv(csvData);
};
function saveToCsv(input) {
  const blob = new Blob([input], { type: "application/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "OrderSummary.csv";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
