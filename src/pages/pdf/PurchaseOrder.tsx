import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#fff",
    padding: 10,
  },
  section: {
    margin: 10,
    padding: 10,
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
  },
  text: {
    margin: 12,
    fontSize: 10,
    textAlign: "left",
  },
  signature: {
    marginTop: 15,
    textAlign: "left",
    marginRight: 40,
    fontSize: 10,
    margin: 12,
  },
  table: {
    // Remove 'display: "table"'
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    // Remove 'display: "table-row"'
    margin: "auto",
    flexDirection: "row",
  },
  tableColHeader: {
    // Remove 'display: "table-cell"'
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCol: {
    // Remove 'display: "table-cell"'
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCellHeader: {
    margin: 5,
    fontSize: 12,
    fontWeight: 500,
  },
  tableCell: {
    margin: 5,
    fontSize: 10,
  },
});

// Create Document Component
const PurchaseOrder = () => {
  const items = [
    { description: "Membrane", price: 13000 },
    { description: "Filter Set", price: 3000 },
    { description: "Sediment Filter", price: 200 },
    { description: "Solar Salt", price: 480 },
  ];

  return (
    <PDFViewer style={{ width: "100%", height: "100vh" }}>
      <Document title={`H2Online Purchase Order`}>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text style={styles.title}>PURCHASE ORDER</Text>

            {/* Supplier Details */}
            <Text style={styles.text}>To: AquaPure Suppliers</Text>
            <Text style={styles.text}>ATTN: Ms. Maria Santos</Text>
            <Text style={styles.text}>
              ADDRESS: 123 Rizal Street, Barangay San Isidro, Quezon City
            </Text>
            <Text style={styles.text}>POSTAL CODE: 1100</Text>
            <Text style={styles.text}>COUNTRY: Philippines</Text>

            <Text style={styles.text}>
              Subject: Order for Water Treatment Supplies
            </Text>

            <Text style={styles.text}>Dear Ms. Santos,</Text>
            <Text style={styles.text}>
              We are placing an order for the following items:
            </Text>

            {/* Table for items */}
            <View style={styles.table}>
              {/* Table Header */}
              <View style={styles.tableRow}>
                <View style={styles.tableColHeader}>
                  <Text style={styles.tableCellHeader}>QUANTITY</Text>
                </View>
                <View style={styles.tableColHeader}>
                  <Text style={styles.tableCellHeader}>DESCRIPTION</Text>
                </View>
                <View style={styles.tableColHeader}>
                  <Text style={styles.tableCellHeader}>UNIT PRICE</Text>
                </View>
                <View style={styles.tableColHeader}>
                  <Text style={styles.tableCellHeader}>TOTAL</Text>
                </View>
              </View>

              {/* Rows for items */}
              {items.map((item, index) => (
                <View key={index} style={styles.tableRow}>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>1</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{item.description}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>
                      PHP {item.price.toFixed(2)}
                    </Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>
                      PHP {item.price.toFixed(2)}
                    </Text>
                  </View>
                </View>
              ))}
            </View>

            <Text style={styles.text}>
              Please ship as soon as possible via LBC Express.
            </Text>
            <Text style={styles.text}>For any queries, please contact:</Text>
            <Text style={styles.text}>
              Mr. Juan Dela Cruz at +639171234567.
            </Text>

            <Text style={styles.text}>
              We look forward to your prompt delivery and appreciate your
              expedient handling of this order.
            </Text>

            {/* Signature */}
            <Text style={styles.signature}>Sincerely,</Text>
            <Text style={styles.signature}>[Signature Image]</Text>
            <Text style={styles.signature}>Juan Dela Cruz, Owner</Text>
            <Text style={styles.signature}>H2Online Water Station</Text>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default PurchaseOrder;
