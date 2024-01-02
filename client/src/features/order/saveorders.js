import * as XLSX from "xlsx";
import jsPDF from "jspdf";
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

export const jsontoPdf = (data) => {
  const filteredData = filterData(data);
  const pdf = new jsPDF();
  const headers = Object.keys(filteredData[0]);
  const fontSize = 8;
  const lineHeight = 10;
  pdf.setFontSize(fontSize);
  pdf.setFont("helvetica", "normal");
  const colWidth = 40;
  const startY = 20;
  let startX = 20;  
  filteredData.forEach((value, index) => {
    headers.forEach((key, colIndex) => {
      const yCoordinate = startY + index * lineHeight;
      const xCoordinate = startX + colIndex * colWidth;
      pdf.text(`${key} : ${value[key]}`, xCoordinate, yCoordinate);
    });
  });
  pdf.save("ordersummary.pdf");
};
