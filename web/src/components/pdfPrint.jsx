import React from 'react'

import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer'

// Create styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: '#EFEFEF',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  text: {
    color: 'black',
    fontSize: '12px',
  },
  header: {
    width: '100%',
    backgroundColor: '#E5E4E4',
    height: '40px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottom: '1px',
  },
  main: {
    width: '85%',
    height: '90%',
    border: '1px',
    backgroundColor: '',
  },
  projectInfo: {
    width: '100%',
    height: '30px',

    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: '12px',
    borderBottom: '1px',
  },
  textSection: {
    fontSize: '12px',
  },
})

// Create Document Component
const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.main}>
        <div style={styles.header}>
          <Text style={styles.text}>Customer Booking Statement</Text>
        </div>
        <div style={styles.projectInfo}>
          <div
            style={{ width: '20%', textAlign: 'center', marginRight: '1px' }}
          >
            <Text>For</Text>
          </div>
          <div style={{ width: '30%', textAlign: 'center' }}>
            <Text>Nithesh</Text>
          </div>
          <div style={{ width: '20%', textAlign: 'center' }}>
            <Text>Project</Text>
          </div>
          <div style={{ width: '30%', textAlign: 'center' }}>
            <Text>Ecostone</Text>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'gray',
            color: 'white',
          }}
        >
          <Text>Customer Information</Text>
        </div>
        <div style={{ fontSize: '12px', margin: '8px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              marginBottom: '4px',
              gap: '12px',
            }}
          >
            <Text style={{ marginRight: '12px', width: '20%' }}>
              Applicant Name:
            </Text>
            <Text>Nithesh</Text>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              marginBottom: '4px',
            }}
          >
            <Text style={{ marginRight: '12px', width: '20%' }}>
              Age/Gender:
            </Text>
            <Text>25/Male</Text>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              marginBottom: '4px',
            }}
          >
            <Text style={{ marginRight: '12px', width: '20%' }}>
              Co-Applicant:
            </Text>
            <Text>Nithesh</Text>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              marginBottom: '4px',
            }}
          >
            <Text style={{ marginRight: '12px', width: '20%' }}>
              Age/Gender:
            </Text>
            <Text>25/Female</Text>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              marginBottom: '4px',
            }}
          >
            <Text style={{ marginRight: '12px', width: '20%' }}>Contact:</Text>
            <Text>89893288454</Text>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              marginBottom: '4px',
            }}
          >
            <Text style={{ marginRight: '12px', width: '20%' }}>Email:</Text>
            <Text>nithesh@test.com</Text>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              marginBottom: '4px',
            }}
          >
            <Text style={{ marginRight: '12px', width: '20%' }}>Address:</Text>
            <Text>Tower D,chennai</Text>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'gray',
            color: 'white',
          }}
        >
          <Text>UNIT Details</Text>
        </div>
        <div style={{ fontSize: '12px', margin: '8px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              marginBottom: '4px',
              gap: '12px',
            }}
          >
            <Text style={{ marginRight: '12px', width: '20%' }}>Site No:</Text>
            <Text>52</Text>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              marginBottom: '4px',
            }}
          >
            <Text style={{ marginRight: '12px', width: '20%' }}>Sy.No:</Text>
            <Text>25</Text>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              marginBottom: '4px',
            }}
          >
            <Text style={{ marginRight: '12px', width: '20%' }}>Project:</Text>
            <Text>Ecostone</Text>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              marginBottom: '4px',
            }}
          >
            <Text style={{ marginRight: '12px', width: '20%' }}>Facing:</Text>
            <Text>North-East</Text>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              marginBottom: '4px',
            }}
          >
            <Text style={{ marginRight: '12px', width: '20%' }}>
              Area(sqft):
            </Text>
            <Text>1,162</Text>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              marginBottom: '4px',
            }}
          >
            <Text style={{ marginRight: '12px', width: '20%' }}>
              Rate/sqft:
            </Text>
            <Text>4,100</Text>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              marginBottom: '4px',
            }}
          >
            <Text style={{ marginRight: '12px', width: '20%' }}>Status:</Text>
            <Text style={{ color: 'green' }}>Booked</Text>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              marginBottom: '4px',
            }}
          >
            <Text style={{ marginRight: '12px', width: '20%' }}>
              Site Cost:
            </Text>
            <Text>47,58,300</Text>
          </div>
        </div>
      </View>
    </Page>
  </Document>
)
export default MyDocument
