import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { padding: 30 },
  section: { marginBottom: 10 },
  image: { width: 100, height: 100, borderRadius: '50%' },
  title: { fontSize: 20, marginBottom: 10 },
  subtitle: { fontSize: 14, marginBottom: 6 },
  text: { fontSize: 12 }
});

const PDFDocument = ({ employeedata, imageBase64 }) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>
          {employeedata?.first_name} {employeedata?.father_name} {employeedata?.last_name}
        </Text>
        <Text style={styles.subtitle}>{employeedata?.job_current?.name || 'Technical Support'}</Text>

        {/* Use the base64 image */}
        <Image style={styles.image} src={imageBase64} />

      </View>

      <View style={styles.section}>
        <Text style={styles.text}>Phone: {employeedata?.phone || '0944299699'}</Text>
        <Text style={styles.text}>Email: {employeedata?.email || 'Sedcobc@gmail.com'}</Text>
        <Text style={styles.text}>Company: {employeedata?.company?.companyName || 'Sedcobc'}</Text>
        <Text style={styles.text}>Location: {employeedata?.company?.location || 'Dubai'}</Text>
        <Text style={styles.text}>Hire Date: {employeedata?.hire_date || '2024-10-14'}</Text>
      </View>
    </Page>
  </Document>
);

export default PDFDocument;
