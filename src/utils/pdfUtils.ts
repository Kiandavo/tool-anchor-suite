
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row-reverse',
    backgroundColor: '#FFFFFF',
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    textAlign: 'right',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'right',
    marginBottom: 20,
    color: '#666',
  },
  heading: {
    fontSize: 16,
    textAlign: 'right',
    marginBottom: 10,
    marginTop: 15,
    borderBottom: '1 solid #333',
    paddingBottom: 5,
  },
  text: {
    fontSize: 12,
    textAlign: 'right',
    marginBottom: 5,
    lineHeight: 1.5,
  },
  contactInfo: {
    fontSize: 12,
    textAlign: 'right',
    marginBottom: 10,
  },
  sectionContainer: {
    marginTop: 20,
    marginBottom: 20,
  }
});

interface ResumeData {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  about: string;
  education: string;
  experience: string;
  skills: string;
}

const ResumePDF = ({ data }: { data: ResumeData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>{data.fullName}</Text>
        <Text style={styles.subtitle}>{data.jobTitle}</Text>

        <View style={styles.sectionContainer}>
          <Text style={styles.heading}>اطلاعات تماس</Text>
          <Text style={styles.contactInfo}>ایمیل: {data.email}</Text>
          <Text style={styles.contactInfo}>تلفن: {data.phone}</Text>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.heading}>درباره من</Text>
          <Text style={styles.text}>{data.about}</Text>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.heading}>تحصیلات</Text>
          <Text style={styles.text}>{data.education}</Text>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.heading}>تجربیات کاری</Text>
          <Text style={styles.text}>{data.experience}</Text>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.heading}>مهارت‌ها</Text>
          <Text style={styles.text}>{data.skills}</Text>
        </View>
      </View>
    </Page>
  </Document>
);

export { ResumePDF };
