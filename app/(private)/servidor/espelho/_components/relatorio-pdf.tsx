"use client";

import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 20, // Reduzi levemente a margem para ganhar espaço
    backgroundColor: "#ffffff",
  },
  header: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    paddingBottom: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#0f172a",
  },
  table: {
    display: "flex",
    width: "100%",
    marginTop: 5,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomColor: "#f1f5f9",
    borderBottomWidth: 1,
    minHeight: 25,
    alignItems: "center",
  },
  tableHeader: {
    backgroundColor: "#f8fafc",
    borderBottomColor: "#e2e8f0",
    borderBottomWidth: 1.5,
  },
  cellHeader: {
    fontSize: 7, // Fonte menor para caber em Retrato
    fontWeight: "bold",
    color: "#475569",
    padding: 3,
  },
  cell: {
    fontSize: 7, // Fonte menor para os dados
    color: "#334155",
    padding: 3,
  },
  // Mapeamento das Cores Originais
  badgeVALIDADO: {
    backgroundColor: "#d1fae5",
    color: "#065f46",
    padding: "1 4",
    borderRadius: 8,
    fontSize: 6,
    fontWeight: "bold",
  },
  badgePENDENTE: {
    backgroundColor: "#fef3c7",
    color: "#92400e",
    padding: "1 4",
    borderRadius: 8,
    fontSize: 6,
    fontWeight: "bold",
  },
  badgeOCORRENCIA: {
    backgroundColor: "#fee2e2",
    color: "#991b1b",
    padding: "1 4",
    borderRadius: 8,
    fontSize: 6,
    fontWeight: "bold",
  },
});

export const RelatorioPontoPDF = ({ dados }: { dados: any[] }) => (
  <Document>
    {/* Mudança de orientation para "portrait" */}
    <Page size="A4" orientation="portrait" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Espelho de Ponto - Retrato</Text>
      </View>

      <View style={styles.table}>
        {/* Cabeçalho com larguras otimizadas para Retrato */}
        <View style={[styles.tableRow, styles.tableHeader]}>
          <View style={{ width: "10%" }}>
            <Text style={styles.cellHeader}>DATA</Text>
          </View>
          <View style={{ width: "10%" }}>
            <Text style={styles.cellHeader}>ENT. 1</Text>
          </View>
          <View style={{ width: "10%" }}>
            <Text style={styles.cellHeader}>SAI. 1</Text>
          </View>
          <View style={{ width: "10%" }}>
            <Text style={styles.cellHeader}>ENT. 2</Text>
          </View>
          <View style={{ width: "10%" }}>
            <Text style={styles.cellHeader}>SAI. 2</Text>
          </View>
          <View style={{ width: "10%" }}>
            <Text style={styles.cellHeader}>TOTAL</Text>
          </View>
          <View style={{ width: "15%" }}>
            <Text style={styles.cellHeader}>SITUAÇÃO</Text>
          </View>
          <View style={{ width: "25%" }}>
            <Text style={styles.cellHeader}>OCORRÊNCIAS</Text>
          </View>
        </View>

        {/* Linhas da Tabela */}
        {dados.map((item, i) => (
          <View key={i} style={styles.tableRow}>
            <View style={{ width: "10%" }}>
              <Text style={[styles.cell, { fontWeight: "bold" }]}>
                {item.data}
              </Text>
            </View>
            <View style={{ width: "10%" }}>
              <Text style={styles.cell}>{item.entrada1}</Text>
            </View>
            <View style={{ width: "10%" }}>
              <Text style={styles.cell}>{item.saida1}</Text>
            </View>
            <View style={{ width: "10%" }}>
              <Text style={styles.cell}>{item.entrada2}</Text>
            </View>
            <View style={{ width: "10%" }}>
              <Text style={styles.cell}>{item.saida2}</Text>
            </View>
            <View style={{ width: "10%" }}>
              <Text style={[styles.cell, { fontWeight: "bold" }]}>
                {item.totalHoras}
              </Text>
            </View>
            <View style={{ width: "15%", paddingLeft: 2 }}>
              <View
                style={styles[`badge${item.situacao}` as keyof typeof styles]}
              >
                <Text>{item.situacao}</Text>
              </View>
            </View>
            <View style={{ width: "25%" }}>
              <Text style={[styles.cell, { color: "#94a3b8", fontSize: 6 }]}>
                {item.ocorrencia || ""}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);
