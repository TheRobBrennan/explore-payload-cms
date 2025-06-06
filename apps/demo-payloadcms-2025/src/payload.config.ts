// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import nodemailer from 'nodemailer'
import sharp from 'sharp' // sharp-import
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'
import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Users } from './collections/Users'
import { Footer } from './Footer/config'
import { Header } from './Header/config'
import { plugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Email configuration constants
const DEFAULT_EMAIL_FROM_NAME = 'NativeBio Website'
const DEFAULT_EMAIL_FROM_ADDRESS = 'nomail@nativebio.org'

// Custom email transport that logs to console
const createMockTransport = () => ({
  name: 'console-logger',
  version: '1.0.0',
  // This is the method that PayloadCMS's nodemailerAdapter expects
  sendMail: (mailOptions: any) => {
    console.log('\n' + '='.repeat(50));
    console.log('📧 EMAIL SENT VIA sendMail');
    console.log('='.repeat(50));
    console.log(`📤 From: ${mailOptions.from || 'Not specified'}`);
    console.log(`📥 To: ${Array.isArray(mailOptions.to) ? mailOptions.to.join(', ') : mailOptions.to || 'Not specified'}`);
    console.log(`📝 Subject: ${mailOptions.subject || 'No subject'}`);
    console.log('📄 Content:');
    console.log('--- HTML ---');
    console.log(mailOptions.html || 'No HTML content');
    console.log('--- TEXT ---');
    console.log(mailOptions.text || 'No text content');
    console.log('='.repeat(50) + '\n');
    
    // Return a Promise with the info object
    return Promise.resolve({
      envelope: {
        from: mailOptions.from?.toString() || 'unknown@localhost',
        to: Array.isArray(mailOptions.to) 
          ? mailOptions.to.map((addr: any) => addr.toString()) 
          : [mailOptions.to?.toString() || 'unknown@localhost']
      },
      messageId: `dev-${Date.now()}-${Math.random().toString(36).substr(2, 9)}@localhost`,
      response: '250 Development email logged to console',
      accepted: Array.isArray(mailOptions.to) ? mailOptions.to : [mailOptions.to],
      rejected: [],
      pending: []
    });
  },
  // Keep the send method for backward compatibility
  send: (mail: any, callback: (err: Error | null, info?: any) => void) => {
    const mailData = mail.data;
    
    console.log('\n' + '='.repeat(50));
    console.log('📧 EMAIL INTERCEPTED FOR DEVELOPMENT');
    console.log('='.repeat(50));
    console.log(`📤 From: ${mailData.from || 'Not specified'}`);
    console.log(`📥 To: ${Array.isArray(mailData.to) ? mailData.to.join(', ') : mailData.to || 'Not specified'}`);
    console.log(`📝 Subject: ${mailData.subject || 'No subject'}`);
    console.log('📄 Content:');
    console.log('--- HTML ---');
    console.log(mailData.html || 'No HTML content');
    console.log('--- TEXT ---');
    console.log(mailData.text || 'No text content');
    console.log('='.repeat(50) + '\n');
    
    // Return success info
    const info = {
      envelope: {
        from: mailData.from?.toString() || 'unknown@localhost',
        to: Array.isArray(mailData.to) 
          ? mailData.to.map((addr: any) => addr.toString()) 
          : [mailData.to?.toString() || 'unknown@localhost']
      },
      messageId: `dev-${Date.now()}-${Math.random().toString(36).substr(2, 9)}@localhost`,
      response: '250 Development email logged to console',
      accepted: Array.isArray(mailData.to) ? mailData.to : [mailData.to],
      rejected: [],
      pending: []
    };
    
    callback(null, info);
  },
  verify: (callback?: (err: Error | null, success?: boolean) => void) => {
    console.log('✅ Mock email transport verified successfully');
    if (callback) callback(null, true);
    return Promise.resolve(true);
  },
  close: (callback?: () => void) => {
    console.log('📪 Mock email transport closed');
    if (callback) callback();
    return Promise.resolve();
  }
});

export default buildConfig({
  admin: {
    components: {
      // The `BeforeLogin` component renders a message that you see while logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below and the import `BeforeLogin` statement on line 15.
      beforeLogin: ['@/components/BeforeLogin'],
      // The `BeforeDashboard` component renders the 'welcome' block that you see after logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below and the import `BeforeDashboard` statement on line 15.
      beforeDashboard: ['@/components/BeforeDashboard'],
      // Add logout link to the admin sidebar
      afterNavLinks: ['@/components/AfterNavLinks'],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: defaultLexical,
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  collections: [Pages, Posts, Media, Categories, Users],
  cors: [getServerSideURL()].filter(Boolean),
  globals: [Header, Footer],
  plugins: [
    ...plugins,
    // storage-adapter-placeholder
  ],
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  // Development email setup - logs to console instead of sending
  email: nodemailerAdapter({
    defaultFromName: process.env.EMAIL_FROM_NAME || DEFAULT_EMAIL_FROM_NAME,
    defaultFromAddress: process.env.EMAIL_FROM_ADDRESS || DEFAULT_EMAIL_FROM_ADDRESS,
    transport: createMockTransport() as any,
  }),
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        // Allow logged in users to execute this endpoint (default)
        if (req.user) return true
        // If there is no logged in user, then check
        // for the Vercel Cron secret to be present as an
        // Authorization header:
        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${process.env.CRON_SECRET}`
      },
    },
    tasks: [],
  },
})