//Library Components
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { common, grey } from "@mui/material/colors";
import Grid from "@mui/material/Grid";
import { isMobile } from "mobile-device-detect";
import "@fontsource/lustria";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { createStyles, makeStyles } from "@mui/styles";

// App components
import ExternalLayout from "@/components/layouts/ExternalLayout";
import ExternalLayoutMobile from "@/components/layouts/ExternalLayoutMobile";
import MainTitle from "@/components/ui/MainTitle";
import BookCardItem from "@/components/ui/BookCardItem";
import Color from "@/components/styles/color";
import { postData } from "@/utils/helpers";

const styles = makeStyles((theme) =>
  createStyles({
    subtitle: {
      marginTop: 64,
      marginBottom: 32,
      maxWidth: 800,
      margin: "0 auto"
    }
  })
);

const PrivacyPolicy = () => {
  const classes = styles();

  return (
    <>
      <Grid container className={classes.root} justifyContent="center">
        <Grid item xs={10}>
          <Container>
            <MainTitle text="Privacy Policy" />
            <Box>
              <Typography variant="h6">
                Welcome to Atom, the online and mobile service of TalkTent Inc.
                dba Atom (“Atom,” “we,” “our,” or “us”). We are committed to
                protecting your privacy and to treating your personal
                information as you would want it to be treated. This Privacy
                Policy explains how we collect, use, share and protect your
                personal information. It applies to all Atom websites,
                applications, services and tools (collectively, our “Service”).
                Please remember that we provide our Service to enrichment
                organizers, businesses, teachers, or others who use our Service
                to organize, advertise or enroll children in a program, course,
                camp, team, league, or other group or event (“Service
                Providers”) who have their own privacy practices. This Privacy
                Policy applies only to our own data practices, and not to the
                practices of third parties that we do not control. By using our
                Service, you agree to the terms of this Privacy Policy and our
                Terms of Use.
              </Typography>
              <Typography variant="h6">
                1. WHAT INFORMATION DO WE COLLECT AND FOR WHAT PURPOSE?
              </Typography>
              <Typography variant="h6">
                We collect a variety of personal information about our users so
                that we can provide our Service. We do our best to be as
                transparent as possible about our data practices and to provide
                you choices about how your data is used when possible. The
                categories of information we collect can include:
              </Typography>
              <Typography variant="h6">
                Registration and profile information collected when you join the
                Service. We may collect personal information such as a email
                address, username, and password when you register for a Atom
                account or if you correspond with us. We also collect billing
                information if you make a payment to a Service Provider.
              </Typography>
              <Typography variant="h6">
                If you are a Service Provider, we may collect additional
                personal information when you join Atom so that we may provide
                the Services to you. If you elect to receive registrations from
                Atom, you will enter into an agreement with our payments
                partner, Stripe, Inc., for the payments service and Stripe’s use
                of your data. Please review the Stripe Privacy Policy
                (https://stripe.com/us/privacy), which will apply to you.
              </Typography>
              <Typography variant="h6">
                Data collected through the use of the Service. We collect
                additional personal information when a person is registered for
                a Program through our Service. Though the information may vary
                based on the needs of the Service Provider offering the Program,
                such information may include person’s name and birth date,
                grade, known allergies, school, information about the parents
                and siblings, and other information. This information may be
                provided to our Service by an adult family member or by a
                Service Provider. We also collect information about how you use
                the Service and the data you input. Many Service Providers will
                customize their websites or their use of our Service to permit
                additional types of data collection and content that is uploaded
                or input into the Service. Any data that you submit or make
                available to others on the Service is User Content.
              </Typography>
              <Typography variant="h6">
                Information we collect from social networks. We may receive
                information about you when you interact with our sites through
                various social media, for example, by liking us on Facebook or
                following us on Twitter. The data we receive is dependent upon
                your privacy settings with the social network. You should always
                review, and if necessary, adjust your privacy settings on
                third-party websites and services.
              </Typography>
              <Typography variant="h6">
                We use this information to operate, maintain, and provide to you
                the features of the Service. We may use this information to
                communicate with you, such as to send you email messages, push
                notifications and to permit other users of the Service to
                contact you. You can control your receipt of email and other
                messaging by visiting the “Profile” page on our website. We may
                also send you Service-related emails or messages (e.g., account
                verification, payment confirmations, change or updates to
                features of the Service, technical and security notices). You
                may not opt-out of Service-related e-mails. For more information
                about your communication preferences, see “Your Choices
                Regarding Your Information” below.
              </Typography>
              <Typography variant="h6">
                2. HOW WE USE COOKIES AND OTHER TRACKING TECHNOLOGY TO COLLECT
                INFORMATION.
              </Typography>
              <Typography variant="h6">
                We automatically collect certain types of usage information when
                you visit our website or use our Service. For instance, when you
                visit our websites, we may send one or more cookies — a small
                text file containing a string of alphanumeric characters — to
                your computer that uniquely identifies your browser and lets us
                help you log in faster and enhance your navigation through the
                site. A cookie may also convey information to us about how you
                use the Service (e.g., the pages you view, the links you click,
                how frequently you access the Service, and other actions you
                take on the Service), and allow us to track your usage of the
                Service over time. We may collect log file information about
                your browser or mobile device each time you access the Service.
                Log file information may include anonymous information such as
                your web request, Internet Protocol (“IP”) address, browser
                type, information about your mobile device, referring / exit
                pages and URLs, number of clicks and how you interact with links
                on the Service, domain names, landing pages, pages viewed, and
                other such information. We may employ clear gifs (also known as
                web beacons) which are used to anonymously track the online
                usage patterns of our Users. In addition, we may also use clear
                gifs in HTML-based emails sent to our users to track which
                emails are opened and which links are clicked by recipients. The
                information allows for more accurate reporting and improvement
                of the Service. We may also collect analytics data, or use
                third-party analytics tools, to help us measure traffic and
                usage trends for the Service. These tools collect information
                sent by your browser or mobile device, including the pages you
                visit, your use of third party applications, and other
                information that assists us in analyzing and improving the
                Service. Although we do our best to honor the privacy
                preferences of our users, we are not able to respond to Do Not
                Track signals from your browser at this time.
              </Typography>
              <Typography variant="h6">
                When you access our Service by or through a mobile device, we
                may receive or collect and store a unique identification number
                associated with your device (“Device ID”), mobile carrier,
                device type and manufacturer, phone number, and, depending on
                your mobile device settings, your geographical location data,
                including GPS coordinates (e.g. latitude and/or longitude) or
                similar information regarding the location of your mobile
                device.
              </Typography>
              <Typography variant="h6">
                If you upload photographs to Atom, those files may contain
                location information or other metadata. This metadata may be
                accessible to others if you share content on the Service.
              </Typography>
              <Typography variant="h6">
                We may use the data collected through cookies, log file, device
                identifiers, location data and clear gifs information to: (a)
                remember information so that you will not have to re-enter it
                during your visit or the next time you visit the site; (b)
                provide custom, personalized content and information, including
                advertising; (c) provide and monitor the effectiveness of our
                Service; (d) monitor aggregate metrics such as total number of
                visitors, traffic, usage, and demographic patterns on our
                website and our Service; (e) diagnose or fix technology
                problems; and (f) otherwise to plan for and enhance our service.
                Please note that the Atom Service may be embedded or otherwise
                integrated with a Service Provider website and that Service
                Provider may place or permit the placement of cookies and other
                tracking technology on that site. Atom is not responsible for
                these tracking practices. You should always read the privacy
                policy of the Service Provider if you have questions about the
                data practices of the Service Provider website.
              </Typography>
              <Typography variant="h6">
                3. SHARING OF YOUR INFORMATION
              </Typography>
              <Typography variant="h6">
                We may share your personal information in the instances
                described below. For further information on your choices
                regarding your information, see the “Your Choices About Your
                Information” section below.
              </Typography>
              <Typography variant="h6">
                Please remember that Atom provides some of its Service for third
                party Service Providers, which have their own data collection
                and use policies that Atom does not control. Please review the
                privacy policies of any third party Service Provider before
                sharing your personal information with that Service Provider.
              </Typography>
              <Typography variant="h6">
                We may share your personal information with:
              </Typography>
              <Typography variant="h6">
                Other companies owned by or under common ownership at Atom.
                These companies will use your personal information in the same
                way as we can under this policy;
              </Typography>
              <Typography variant="h6">
                Third-party vendors and other service providers that perform
                services on our behalf, as needed to carry out their work for
                us, which may include identifying and serving targeted
                advertisements, billing, payment processing, content or service
                fulfillment, or providing analytic services;
              </Typography>
              <Typography variant="h6">
                Third parties at your request. For example, you may make
                information available to a Service Provider through the Service
                (e.g., by signing up for a Program or submitting a request to
                the Service Provider). Each Service Provider may customize the
                manner in which the Service Provider collects, uses, and
                discloses personal information of users who submit information
                to the Service Provider, either directly or through the Atom
                Service. The Atom Privacy Policy does not apply to, and we
                cannot control the activities of, these Service Providers.
                Please consult the respective privacy policies of such Service
                Provider or contact them for more information.
              </Typography>
              <Typography variant="h6">
                The public. Any User Content that you voluntarily disclose for
                posting to the Service is viewable by other users and the
                public.
              </Typography>
              <Typography variant="h6">
                Other parties in connection with a company transaction, such as
                a merger, sale of company assets or shares, reorganization,
                financing, change of control or acquisition of all or a portion
                of our business by another company or third party or in the
                event of a bankruptcy or related or similar proceedings; and
                Third parties as required by law or subpoena or to if we
                reasonably believe that such action is necessary to (a) comply
                with the law and the reasonable requests of law enforcement; (b)
                to enforce our Terms of Use or to protect the security or
                integrity of our Service; and/or (c) to exercise or protect the
                rights, property, or personal safety of Atom, our Users, or
                others.
              </Typography>
              <Typography variant="h6">
                We may also aggregate or otherwise strip data of all personally
                identifying characteristics and may share that aggregated,
                anonymized data with third parties.
              </Typography>
              <Typography variant="h6">
                4. YOUR CHOICES ABOUT YOUR INFORMATION
              </Typography>
              <Typography variant="h6">
                You control your account information and communications
                preferences: You may update your account information and
                communication preferences at any time by logging into your
                account and changing your account settings. You can also stop
                receiving promotional email communications from us by clicking
                on the “unsubscribe link” provided in such communications. We
                make every effort to promptly process all unsubscribe requests.
                As noted above, you may not opt out of Service-related
                communications (e.g., account verification, purchase and billing
                confirmations and reminders, changes/updates to features of the
                Service, technical and security notices). If you have any
                questions about reviewing or modifying your account information,
                you can contact us directly at support@atom.live.
              </Typography>
              <Typography variant="h6">
                Privacy Settings: Subject to your profile and privacy settings,
                any User Content that you make public is searchable by other
                Users and may be viewable on search engines. You may be able to
                restrict some of this public sharing by limiting the type of
                data you submit to the Service. Changing your privacy settings
                will not have any effect on information that was previously
                shared through the Service.
              </Typography>
              <Typography variant="h6">
                How long we keep your User Content: Following termination or
                deactivation of your User account, Atom may retain your profile
                information and User Content for a commercially reasonable time
                for backup, archival, or audit purposes. Please contact us at
                support@atom.live if you wish to delete your account and we will
                do so promptly. Please be aware that we will not be able to
                delete any content you have shared with others on the Service or
                with social media sites.
              </Typography>
              <Typography variant="h6">
                5. HOW WE STORE AND PROTECT YOUR INFORMATION
              </Typography>
              <Typography variant="h6">
                Storage and Processing: Your information collected through the
                Service may be stored and processed in the United States or any
                other country in which Atom or its subsidiaries, affiliates or
                service providers maintain facilities. If you are located in the
                European Union or other regions with laws governing data
                collection and use that may differ from U.S. law, please note
                that we may transfer information, including personal
                information, to a country and jurisdiction that does not have
                the same data protection laws as your jurisdiction, and you
                consent to the transfer of information to the U.S. or any other
                country in which Atom or its parent, subsidiaries, affiliates or
                service providers maintain facilities and the use and disclosure
                of information about you as described in this Privacy Policy.
              </Typography>
              <Typography variant="h6">
                Keeping your information safe: Atom cares about the security of
                your information, and uses commercially reasonable physical,
                administrative, and technological safeguards to preserve the
                integrity and security of all information collected through the
                Service. However, no security system is impenetrable and we
                cannot guarantee the security of our systems 100%. In the event
                that any information under our control is compromised as a
                result of a breach of security, Atom will take reasonable steps
                to investigate the situation and where appropriate, notify those
                individuals whose information may have been compromised and take
                other steps, in accordance with any applicable laws and
                regulations.
              </Typography>
              <Typography variant="h6">6. CHILDREN’S PRIVACY</Typography>
              <Typography variant="h6">
                Atom does not knowingly collect or solicit any information from
                anyone under the age of 13 or knowingly allow such persons to
                register as Users. While Atom may collect certain information
                about children under 13 that a parent or Service Provider
                provides to our Service, the Service and its content are not
                directed at children under the age of 13. In the event that we
                learn that we have collected personal information from a child
                under age 13, we will delete that information as quickly as
                possible. If you believe that we might have collected any
                information from a child under 13, please contact us at
                support@atom.live.
              </Typography>
              <Typography variant="h6">
                Information about a person registered for a Program through our
                Service is not made available or visible to the public. This
                information is only made available to the individual that
                registered the person and the Service Providers, including
                Enrichment Organizers.
              </Typography>
              <Typography variant="h6">
                Information about a person registered for a Program through our
                Service is not made available or visible to the public. This
                information is only made available to the individual that
                registered the person and the Service Providers, including
                Enrichment Organizers.
              </Typography>
              <Typography variant="h6">
                7. LINKS TO OTHER WEB SITES AND SERVICES
              </Typography>
              <Typography variant="h6">
                Our Service may integrate with or contains links to other third
                party sites and services. We are not responsible for the
                practices employed by third party websites or services embedded
                in, linked to, or linked from the Service and your interactions
                with any third-party website or service are subject to that
                third party’s own rules and policies. In addition, you agree
                that we are not responsible for and we do not have any control
                over any third-parties that you authorize to access your User
                Content, including the Service Provider you interact with on our
                Service.
              </Typography>
              <Typography variant="h6">
                8. HOW TO CONTACT US If you have any questions about this
                Privacy Policy or the Service, please contact us at
                support@atom.live.
              </Typography>
              <Typography variant="h6">
                9. CHANGES TO OUR PRIVACY POLICY
              </Typography>
              <Typography variant="h6">
                Atom may modify or update this Privacy Policy from time to time
                to reflect the changes in our business and practices, and so you
                should review this page periodically. When we change the policy
                in a material manner we will let you know and update the ‘last
                modified’ date at the bottom of this page. This privacy policy
                was last modified on November 1, 2020.
              </Typography>
            </Box>
          </Container>
        </Grid>
      </Grid>
    </>
  );
};

PrivacyPolicy.layout = ExternalLayout;

const PrivacyPolicyMobile = () => {
  return (
    <>
      <span>stories</span>
    </>
  );
};

PrivacyPolicyMobile.layout = ExternalLayoutMobile;

const PrivacyPolicyPage = isMobile ? PrivacyPolicyMobile : PrivacyPolicy;

export default PrivacyPolicy;
