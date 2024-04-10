import { useEffect } from "react";

//Library Components
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import { common, purple } from "@mui/material/colors";
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
    emoji: {
      width: 30,
      height: 30
    },
    thumbnail: {
      width: 200,
      marginBottom: theme.spacing(3)
    },
    gridBackground: {
      background: "white",
      paddingBottom: theme.spacing(10),
      paddingTop: theme.spacing(5)
    },
    subtitle: {
      marginTop: 64,
      marginBottom: 32,
      maxWidth: 800,
      margin: "0 auto"
    }
  })
);

const Terms = () => {
  useEffect(() => {}, []);

  const classes = styles();
  const bull = <span className={classes.bullet}>•</span>;
  const shocked = (
    <span className={classes.bullet}>
      <img
        className={classes.emoji}
        src="/static/img/home/emojis/emoji-shocked.png"
        alt="shocked emoji"
      />
    </span>
  );

  const waveColors = [purple[600], purple[300], purple[100], common.white];

  return (
    <>
      {/* <Wave waveColors={waveColors} /> */}
      <Grid container className={classes.gridBackground}>
        <Grid item xs={12}>
          <Container>
            <MainTitle text="Terms of Service" />
            <Box>
              <Typography gutterBottom variant="h6">
                Effective Date: November 1, 2022
              </Typography>
              <Typography variant="body2">
                Welcome to Atom, the website and online service of Atoms Labs,
                Inc dba Atom.live ("Atom," "we," or "us"). This page explains
                the terms by which you may use our online and/or mobile
                services, web site, and software provided on or in connection
                with the service (collectively the "Service").
              </Typography>
              <Typography variant="body2">
                By accessing or using the Service, you signify that you have
                read, understood, and agree to be bound by this User Agreement
                ("Agreement"), to the collection and use of your information as
                set forth in the Atom Privacy Policy, and, if you are a Service
                Provider (as defined in the Service Provider Agreement), whether
                or not you are a registered user of our Service.{" "}
              </Typography>
              <Typography variant="body2">
                Because our Services change relatively often, Atom reserves the
                right to make modifications to this Agreement, the Service
                Provider Agreement and our Privacy Policy. If they change, we
                will notify you via email in advance of any material changes to
                the terms. Upon making changes, we will update the “Effective
                Date” found at the top of this page. Your continued use of the
                Services after any changes constitutes your acceptance of the
                new terms.{" "}
              </Typography>
              <Typography variant="body2">
                This Agreement applies to all visitors, users, and others who
                access the Service, including Service Providers (each a "User").
              </Typography>
              <Typography gutterBottom variant="h6">
                1. Use of Our Service{" "}
              </Typography>
              <Typography variant="body2">
                Atom provides a simple, easy-to-use platform for parents and
                Service Providers to connect in order to provide adults and
                children with high-quality classes, camps, teams, leagues, and
                other groups and events.
              </Typography>
              <Typography gutterBottom variant="h6">
                1.1 Parent Consent
              </Typography>
              <Typography variant="body2">
                By allowing your child to participate in our virtual
                storytelling sessions, you are granting permission for your
                child to engage directly with our teachers in a virtual setting.
                Our interactive sessions are designed to involve your child in
                the storytelling process, including asking and answering
                questions, and actively participating in the narrative. With
                your consent, your child's voice may be included in our edited
                YouTube versions of these storytimes, and their first name may
                be mentioned during the session. Please be assured, however,
                that we respect your child's privacy; their images will never be
                shown in any of our sessions or in the edited versions uploaded
                to YouTube. We are committed to creating a safe, educational,
                and enjoyable environment for your child to explore new stories
                and learn valuable lessons. Your consent is important to us as
                it enables your child to fully experience the interactive
                elements of our storytelling sessions.
              </Typography>
              <Typography gutterBottom variant="h6">
                1.2 Eligibility{" "}
              </Typography>
              <Typography variant="body2">
                You may use the Service only if you can form a binding contract
                with Atom, and only in compliance with this Agreement and all
                applicable local, state, national, and international laws, rules
                and regulations. Any use or access to the Service by anyone
                under 13 is strictly prohibited and in violation of this
                Agreement. The Service is not available to any Users previously
                removed from the Service by Atom.
              </Typography>
              <Typography gutterBottom variant="h6">
                1.3 Atom Service{" "}
              </Typography>
              <Typography variant="body2">
                Subject to the terms and conditions of this Agreement, you are
                hereby granted a non-exclusive, limited, non-transferable,
                freely revocable license to use the Service for your personal,
                noncommercial use only and as permitted by the features of the
                Service. Atom reserves all rights not expressly granted herein
                in the Service and the Atom Content (as defined below). Atom may
                terminate this license at any time for any reason or no reason.
              </Typography>
              <Typography gutterBottom variant="h6">
                1.4 Atom Account Creation and Activation
              </Typography>
              <Typography variant="body2">
                Your Atom account gives you access to the services and
                functionality that we may establish and maintain from time to
                time and in our sole discretion. We may maintain different types
                of accounts for different types of Users, including Service
                Providers. If you open a Atom account on behalf of a company,
                organization, or other entity, then (a) “you” includes you and
                that entity, and (b) you represent and warrant that you are an
                authorized representative of the entity with the authority to
                bind the entity to this Agreement (and, if you are a Service
                Provider, the Service Provider Agreement) By connecting to Atom
                with a third-party service, you give us permission to access and
                use your information from that service as permitted by that
                service, and to store your log-in credentials for that service.
                You may open a Atom account on your own, or, if you are a
                Service Provider, we may create one on your behalf using
                publicly available information gathered via search engines such
                as Google or otherwise. If a Atom account has been created for
                you, you may claim the account by emailing us at
                support@atom.live and providing us sufficient documentation, or
                you may request that we delete the account and we will do so. If
                you claim your Atom account, you will be given the appropriate
                login credentials by Atom and you will be able to use the
                account as if you had created it on your own.
              </Typography>
              <Typography gutterBottom variant="h6">
                1.5 Atom Account Rules and Management
              </Typography>
              <Typography variant="body2">
                You may never use another User’s account without permission.
                When creating your account, you must provide accurate and
                complete information. You are solely responsible for the
                activity that occurs on your account, and you must keep your
                account password secure. We encourage you to use “strong”
                passwords (passwords that use a combination of upper and lower
                case letters, numbers and symbols) with your account. You must
                notify Atom immediately of any breach of security or
                unauthorized use of your account.{" "}
              </Typography>
              <Typography variant="body2">
                Atom will not be liable for any losses caused by any
                unauthorized use of your account. By providing Atom your email
                address you consent to our using the email address to send you
                Service-related notices, including any notices required by law,
                in lieu of communication by postal mail. Any service providers
                you have enrolled with through Atom may also email you regarding
                the activity or special offers. We may also use your email
                address to send you other messages, such as changes to features
                of the Service and special offers. If you do not want to receive
                such email messages, you may opt out or change your preferences
                by emailing us at support@atom.live. Opting out may prevent you
                from receiving email messages regarding updates, improvements,
                or offers.
              </Typography>
              <Typography gutterBottom variant="h6">
                1.6 Service Rules
              </Typography>
              <Typography variant="body2">
                You agree not to engage in any of the following prohibited
                activities: (i) copying, distributing, or disclosing any part of
                the Service in any medium, including without limitation by any
                automated or non-automated “scraping”; (ii) unless permitted via
                a “robots.txt” file or similar mechanism, using any automated
                system, including without limitation “robots,” “spiders,”
                “offline readers,” etc., to access the Service in a manner that
                sends more request messages to the Atom servers than a human can
                reasonably produce in the same period of time by using a
                conventional online web browser; (iii) transmitting spam, chain
                letters, or other unsolicited email; (iv) attempting to
                interfere with, compromise the system integrity or security or
                decipher any transmissions to or from the servers running the
                Service; (v) taking any action that imposes, or may impose at
                our sole discretion an unreasonable or disproportionately large
                load on our infrastructure; (vi) uploading invalid data,
                viruses, worms, or other software agents through the Service;
                (vii) collecting or harvesting any personally identifiable
                information, including account names, from the Service; (viii)
                using the Service for any commercial solicitation purposes; (ix)
                impersonating another person or otherwise misrepresenting your
                affiliation with a person or entity, conducting fraud, hiding or
                attempting to hide your identity; (x) interfering with the
                proper working of the Service; (xi) accessing any content on the
                Service through any technology or means other than those
                provided or authorized by the Service; or (xii) bypassing the
                measures we may use to prevent or restrict access to the
                Service, including without limitation features that prevent or
                restrict use or copying of any content or enforce limitations on
                use of the Service or the content therein.
              </Typography>
              <Typography variant="body2">
                We may, without prior notice, change the Service; stop providing
                the Service or features of the Service, to you or to users
                generally; or create usage limits for the Service. We may
                permanently or temporarily terminate or suspend your access to
                the Service without notice and liability for any reason,
                including if in our sole determination you violate any provision
                of this Agreement (or, if you are a Service Provider, the
                Service Provider Agreement), or for no reason. Upon termination
                for any reason or no reason, you continue to be bound by this
                Agreement (and, if you are a Service Provider, the Service
                Provider Agreement).
              </Typography>
              <Typography variant="body2">
                You are solely responsible for your interactions with other Atom
                Users. We reserve the right, but have no obligation, to monitor
                disputes between you and other Users. Atom shall have no
                liability for your interactions with other Users, or for any
                User’s action or inaction.
              </Typography>
              <Typography gutterBottom variant="h6">
                2. User Content
              </Typography>
              <Typography variant="body2">
                Some areas of the Service allow Users to post content such as
                profile information, comments, questions, and other content or
                information (any such materials a User submits, posts, displays,
                or otherwise makes available on the Service "User Content"). We
                claim no ownership rights over User Content created by you. The
                User Content you create remains yours; however, by sharing User
                Content through the Service, you agree to allow others to view,
                edit, and/or share your User Content in accordance with your
                settings and this Agreement (and, if you are a Service Provider,
                the Service Provider Agreement). Atom has the right (but not the
                obligation) in its sole discretion to remove any User Content
                that is shared via the Service.
              </Typography>
              <Typography variant="body2">
                You agree not to post User Content that: (i) may create a risk
                of harm, loss, physical or mental injury, emotional distress,
                death, disability, disfigurement, or physical or mental illness
                to you, to any other person, or to any animal; (ii) may create a
                risk of any other loss or damage to any person or property;
                (iii) seeks to harm or exploit children by exposing them to
                inappropriate content, asking for personally identifiable
                details or otherwise; (iv) may constitute or contribute to a
                crime or tort; (v) contains any information or content that we
                deem to be unlawful, harmful, abusive, racially or ethnically
                offensive, defamatory, infringing, invasive of personal privacy
                or publicity rights, harassing, humiliating to other people
                (publicly or otherwise), libelous, threatening, profane, or
                otherwise objectionable; (vi) contains any information or
                content that is illegal (including, without limitation, the
                disclosure of insider information under securities law or of
                another party’s trade secrets); (vii) contains any information
                or content that you do not have a right to make available under
                any law or under contractual or fiduciary relationships; or
                (viii) contains any information or content that you know is not
                correct and current. You agree that any User Content that you
                post does not and will not violate third-party rights of any
                kind, including without limitation any Intellectual Property
                Rights (as defined below) or rights of privacy. To the extent
                that your User Content contains music, you hereby represent that
                you are the owner of all the copyright rights, including without
                limitation the performance, mechanical, and sound recordings
                rights, with respect to each and every musical composition
                (including lyrics) and sound recording contained in such User
                Content and have the power to grant the license granted below.
                Atom reserves the right, but is not obligated, to reject and/or
                remove any User Content that Atom believes, in its sole
                discretion, violates these provisions. You understand that
                publishing your User Content on the Service is not a substitute
                for registering it with the U.S. Copyright Office, the Writer’s
                Guild of America, or any other rights organization.
              </Typography>
              <Typography variant="body2">
                For the purposes of this Agreement, "Intellectual Property
                Rights" means all patent rights, copyright rights, mask work
                rights, moral rights, rights of publicity, trademark, trade
                dress and service mark rights, goodwill, trade secret rights and
                other intellectual property rights as may now exist or hereafter
                come into existence, and all applications therefore and
                registrations, renewals and extensions thereof, under the laws
                of any state, country, territory or other jurisdiction.
              </Typography>
              <Typography variant="body2">
                In connection with your User Content, you affirm, represent and
                warrant the following:
              </Typography>
              <Typography variant="body2">
                You have the written consent of each and every identifiable
                natural person in the User Content to use such person’s name or
                likeness in the manner contemplated by the Service and this
                Agreement (and, if you are a Service Provider, the Service
                Provider Agreement), and each such person has released you from
                any liability that may arise in relation to such use.
              </Typography>
              <Typography variant="body2">
                Your User Content and Atom’s use thereof as contemplated by this
                Agreement (and, if you are a Service Provider, the Service
                Provider Agreement) and the Service will not violate any law or
                infringe any rights of any third-party, including but not
                limited to any Intellectual Property Rights and privacy rights.
              </Typography>
              <Typography variant="body2">
                Atom may exercise the rights to your User Content granted under
                this Agreement (and, if you are a Service Provider, the Service
                Provider Agreement) without liability for payment of any guild
                fees, residuals, payments, fees, or royalties payable under any
                collective bargaining agreement or otherwise.
              </Typography>
              <Typography variant="body2">
                To the best of your knowledge, all your User Content and other
                information that you provide to us is truthful, complete, and
                accurate.
              </Typography>
              <Typography variant="body2">
                Atom takes no responsibility and assumes no liability for any
                User Content that you or any other User or third-party posts or
                sends over the Service. You shall be solely responsible for your
                User Content and the consequences of posting or publishing it,
                and you agree that we are only acting as a passive conduit for
                your online distribution and publication of your User Content.
                You understand and agree that you may be exposed to User Content
                that is inaccurate, objectionable, inappropriate for children,
                or otherwise unsuited to your purpose, and you agree that Atom
                shall not be liable for any damages you allege to incur as a
                result of User Content.{" "}
              </Typography>
              <Typography gutterBottom variant="h6">
                3. Our Proprietary Rights
              </Typography>
              <Typography variant="body2">
                You may choose to or we may invite you to submit comments or
                ideas about the Service, including without limitation about how
                to improve the Service or our products (“Ideas”). By submitting
                any Idea, you agree that your disclosure is gratuitous,
                unsolicited and without restriction and will not place Atom
                under any fiduciary or other obligation, and that we are free to
                use the Idea without any additional compensation to you, and/or
                to disclose the Idea on a non-confidential basis or otherwise to
                anyone. You further acknowledge that, by acceptance of your
                submission, Atom does not waive any rights to use similar or
                related ideas previously known to Atom, or developed by its
                employees, or obtained from sources other than you.
              </Typography>
              <Typography gutterBottom variant="h6">
                4. Payments to Service Providers
              </Typography>
              <Typography gutterBottom variant="h6">
                4.1. Payments to Service Providers
              </Typography>
              <Typography variant="body2">
                When you make a reservation and/or enroll with a Service
                Provider through the Service, you agree to be bound by and to
                pay for that transaction, and, unless you properly request and
                receive a refund from a Service Provider, you must pay for the
                activity you register for or enroll in. You authorize us to
                charge the full amount to your chosen payment provider for the
                transaction. In the event of a pricing error, where the price on
                Atom is lower than authorized by the Service Provider, you will
                be invoiced for the difference or the reservation will be
                cancelled and your payment will be refunded.
              </Typography>
              <Typography gutterBottom variant="h6">
                4.2 Refunds and Credits.
              </Typography>
              <Typography variant="body2">
                Your ability to cancel a reservation or enrollment, or to obtain
                refunds or credits, is determined by the Service Provider.
                Referral fees and credit card processing fees charged by Atom
                are non-refundable. Service Providers may modify class schedules
                at any time or cancel listings if, in their sole discretion,
                enrollment for the class is insufficient. Refunds or credits for
                modified or canceled listings are determined by the Service
                Provider. Please contact the appropriate Service Provider
                directly to discuss their policies on refunds and cancellations.
              </Typography>
              <Typography gutterBottom variant="h6">
                4.3 Payment Information
              </Typography>
              <Typography variant="body2">
                Taxes All information that you provide in connection with a
                purchase or transaction or other monetary transaction
                interaction with the Service must be accurate, complete, and
                current. You agree to pay all charges incurred by users of your
                credit card, debit card, or other payment method used in
                connection with a purchase or transaction or other monetary
                transaction interaction with the Service at the prices in effect
                when such charges are incurred. You will pay any applicable
                taxes, if any, relating to any such purchases, transactions or
                other monetary transaction interactions.
              </Typography>
              <Typography gutterBottom variant="h6">
                5. Privacy
              </Typography>
              <Typography variant="body2">
                We care about the privacy of our Users. You understand that by
                using the Services you consent to the collection, use and
                disclosure of your personally identifiable information and
                aggregate data as set forth in our Privacy Policy, and to have
                your personally identifiable information collected, used,
                transferred to and processed in the United States.
              </Typography>
              <Typography gutterBottom variant="h6">
                6. Security
              </Typography>
              <Typography variant="body2">
                Atom cares about the integrity and security of your personal
                information. However, we cannot guarantee that unauthorized
                third-parties will never be able to defeat our security measures
                or use your personal information for improper purposes. You
                acknowledge that you provide your personal information at your
                own risk.
              </Typography>
              <Typography gutterBottom variant="h6">
                7. DMCA Notice
              </Typography>
              <Typography variant="body2">
                Since we respect artist and content owner rights, it is Atom’s
                policy to respond to alleged infringement notices that comply
                with the Digital Millennium Copyright Act of 1998 ("DMCA"). If
                you believe that your copyrighted work has been copied in a way
                that constitutes copyright infringement and is accessible via
                the Service, please notify Atom’s copyright agent as set forth
                in the DMCA. For your complaint to be valid under the DMCA, you
                must provide the following information in writing:
              </Typography>
              <Typography variant="body2">
                An electronic or physical signature of a person authorized to
                act on behalf of the copyright owner;
              </Typography>
              <Typography variant="body2">
                Identification of the copyrighted work that you claim has been
                infringed; Identification of the material that is claimed to be
                infringing and where it is located on the Service;
              </Typography>
              <Typography variant="body2">
                Information reasonably sufficient to permit Atom to contact you,
                such as your address, telephone number, and, e-mail address;
              </Typography>
              <Typography variant="body2">
                A statement that you have a good faith belief that use of the
                material in the manner complained of is not authorized by the
                copyright owner, its agent, or law; and
              </Typography>
              <Typography variant="body2">
                A statement, made under penalty of perjury, that the above
                information is accurate, and that you are the copyright owner or
                are authorized to act on behalf of the owner.
              </Typography>
              <Typography variant="body2">
                The above information must be submitted to the following
              </Typography>
              <Typography variant="body2">
                DMCA Agent: Attn: DMCA NOTICE - Atom Address: 2093 PHILADELPHIA
                PIKE #8080 CLAYMONT, DE 19703 UNITED STATES
              </Typography>
              <Typography variant="body2">Email: support@atom.live</Typography>
              <Typography variant="body2">
                UNDER FEDERAL LAW, IF YOU KNOWINGLY MISREPRESENT THAT ONLINE
                MATERIAL IS INFRINGING, YOU MAY BE SUBJECT TO CRIMINAL
                PROSECUTION FOR PERJURY AND CIVIL PENALTIES, INCLUDING MONETARY
                DAMAGES, COURT COSTS, AND ATTORNEYS’ FEES.
              </Typography>
              <Typography variant="body2">
                Please note that this procedure is exclusively for notifying
                Atom and its affiliates that your copyrighted material has been
                infringed. The preceding requirements are intended to comply
                with Atom’s rights and obligations under the DMCA, including 17
                U.S.C. §512(c), but do not constitute legal advice. It may be
                advisable to contact an attorney regarding your rights and
                obligations under the DMCA and other applicable laws.{" "}
              </Typography>
              <Typography variant="body2">
                In accordance with the DMCA and other applicable law, Atom has
                adopted a policy of terminating, in appropriate circumstances,
                Users who are deemed to be repeat infringers. Atom may also at
                its sole discretion limit access to the Service and/or terminate
                the accounts of any Users who infringe any intellectual property
                rights of others, whether or not there is any repeat
                infringement.
              </Typography>
              <Typography gutterBottom variant="h6">
                8. Third-Party Links
              </Typography>
              <Typography variant="body2">
                The Service may contain links to third-party websites,
                advertisers, services, special offers, or other events or
                activities that are not owned or controlled by Atom. Atom does
                not endorse or assume any responsibility for any such
                third-party sites, information, materials, products, or
                services. If you access a third-party website from the Service,
                you do so at your own risk, and you understand that this
                Agreement, the Service Provider Agreement, and the Privacy
                Policy do not apply to your use of such sites. You expressly
                relieve Atom from any and all liability arising from your use of
                any third-party website, service, or content. Additionally, your
                dealings with or participation in promotions of advertisers
                found on the Service, including payment and delivery of goods,
                and any other terms (such as warranties) are solely between you
                and such advertisers. You agree that Atom shall not be
                responsible for any loss or damage of any sort relating to your
                dealings with such advertisers.
              </Typography>
              <Typography gutterBottom variant="h6">
                9. Indemnity
              </Typography>
              <Typography variant="body2">
                You agree to defend, indemnify and hold harmless Atom and its
                subsidiaries, agents, licensors, managers, and other affiliated
                companies, and their employees, contractors, agents, officers
                and directors, from and against any and all claims, damages,
                obligations, losses, liabilities, costs or debt, and expenses
                (including but not limited to attorney’s fees) arising from: (i)
                your use of and access to the Service, including any data or
                content transmitted or received by you; (ii) your violation of
                any term of this Agreement, the Privacy Policy, or, if you are a
                Service Provider, the Service Provider Agreement, including
                without limitation your breach of any of the representations and
                warranties above; (iii) your violation of any third-party right,
                including without limitation any right of privacy or
                Intellectual Property Rights; (iv) your violation of any
                applicable law, rule or regulation; (v) any claim or damages
                that arise as a result of any of your User Content or any that
                is submitted via your account; or (vi) any other party’s access
                and use of the Service with your unique username, password or
                other appropriate security code.
              </Typography>
              <Typography variant="body2">
                10. No Warranty THE SERVICE IS PROVIDED ON AN “AS IS” AND “AS
                AVAILABLE” BASIS. USE OF THE SERVICE IS AT YOUR OWN RISK. TO THE
                MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, THE SERVICE IS
                PROVIDED WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS OR
                IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF
                MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR
                NON-INFRINGEMENT. WITHOUT LIMITING THE FOREGOING, Atom, ITS
                SUBSIDIARIES, ITS AFFILIATES, AND ITS LICENSORS DO NOT WARRANT
                THAT THE CONTENT IS ACCURATE, RELIABLE OR CORRECT; THAT THE
                SERVICE WILL MEET YOUR REQUIREMENTS; THAT THE SERVICE WILL BE
                AVAILABLE AT ANY PARTICULAR TIME OR LOCATION, UNINTERRUPTED OR
                SECURE; THAT ANY DEFECTS OR ERRORS WILL BE CORRECTED; OR THAT
                THE SERVICE IS FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS. ANY
                CONTENT DOWNLOADED OR OTHERWISE OBTAINED THROUGH THE USE OF THE
                SERVICE IS DOWNLOADED AT YOUR OWN RISK AND YOU WILL BE SOLELY
                RESPONSIBLE FOR ANY DAMAGE TO YOUR COMPUTER SYSTEM OR MOBILE
                DEVICE OR LOSS OF DATA THAT RESULTS FROM SUCH DOWNLOAD OR YOUR
                USE OF THE SERVICE.
              </Typography>
              <Typography variant="body2">
                Atom DOES NOT WARRANT, ENDORSE, GUARANTEE, OR ASSUME
                RESPONSIBILITY FOR ANY PRODUCT OR SERVICE ADVERTISED OR OFFERED
                BY A THIRD-PARTY THROUGH THE Atom SERVICE OR ANY HYPERLINKED
                WEBSITE OR SERVICE, AND Atom WILL NOT BE A PARTY TO OR IN ANY
                WAY MONITOR ANY TRANSACTION BETWEEN YOU AND THIRD-PARTY
                PROVIDERS OF PRODUCTS OR SERVICES. FEDERAL LAW, SOME STATES,
                PROVINCES AND OTHER JURISDICTIONS DO NOT ALLOW EXCLUSIONS AND
                LIMITATIONS OF CERTAIN IMPLIED WARRANTIES, SO SOME OF THE ABOVE
                LIMITATIONS MAY NOT APPLY TO YOU.
              </Typography>
              <Typography gutterBottom variant="h6">
                11. Limitation of Liability
              </Typography>
              <Typography variant="body2">
                TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT
                SHALL Atom, ITS AFFILIATES, AGENTS, DIRECTORS, EMPLOYEES,
                SUPPLIERS OR LICENSORS BE LIABLE FOR ANY INDIRECT, PUNITIVE,
                INCIDENTAL, SPECIAL, CONSEQUENTIAL OR EXEMPLARY DAMAGES,
                INCLUDING WITHOUT LIMITATION DAMAGES FOR LOSS OF PROFITS,
                GOODWILL, USE, DATA OR OTHER INTANGIBLE LOSSES, THAT RESULT FROM
                THE USE OF, OR INABILITY TO USE, THIS SERVICE. UNDER NO
                CIRCUMSTANCES WILL Atom BE RESPONSIBLE FOR ANY DAMAGE, LOSS OR
                INJURY RESULTING FROM HACKING, TAMPERING OR OTHER UNAUTHORIZED
                ACCESS OR USE OF THE SERVICE OR YOUR ACCOUNT OR THE INFORMATION
                CONTAINED THEREIN.
              </Typography>
              <Typography variant="body2">
                TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, Atom ASSUMES
                NO LIABILITY OR RESPONSIBILITY FOR ANY (I) ERRORS, MISTAKES, OR
                INACCURACIES OF CONTENT; (II) PERSONAL INJURY OR PROPERTY
                DAMAGE, OF ANY NATURE WHATSOEVER, RESULTING FROM YOUR ACCESS TO
                OR USE OF OUR SERVICE; (III) ANY UNAUTHORIZED ACCESS TO OR USE
                OF OUR SECURE SERVERS AND/OR ANY AND ALL PERSONAL INFORMATION
                STORED THEREIN; (IV) ANY INTERRUPTION OR CESSATION OF
                TRANSMISSION TO OR FROM THE SERVICE; (V) ANY BUGS, VIRUSES,
                TROJAN HORSES, OR THE LIKE THAT MAY BE TRANSMITTED TO OR THROUGH
                OUR SERVICE BY ANY THIRD-PARTY; (VI) ANY ERRORS OR OMISSIONS IN
                ANY CONTENT OR FOR ANY LOSS OR DAMAGE INCURRED AS A RESULT OF
                THE USE OF ANY CONTENT POSTED, EMAILED, TRANSMITTED, OR
                OTHERWISE MADE AVAILABLE THROUGH THE SERVICE; AND/OR (VII) USER
                CONTENT OR THE DEFAMATORY, OFFENSIVE, OR ILLEGAL CONDUCT OF ANY
                THIRD-PARTY. IN NO EVENT SHALL Atom, ITS AFFILIATES, AGENTS,
                DIRECTORS, EMPLOYEES, SUPPLIERS, OR LICENSORS BE LIABLE TO YOU
                FOR ANY CLAIMS, PROCEEDINGS, LIABILITIES, OBLIGATIONS, DAMAGES,
                LOSSES OR COSTS IN AN AMOUNT EXCEEDING THE AMOUNT YOU PAID TO
                Atom HEREUNDER OR $100.00, WHICHEVER IS GREATER. THIS LIMITATION
                OF LIABILITY SECTION APPLIES WHETHER THE ALLEGED LIABILITY IS
                BASED ON CONTRACT, TORT, NEGLIGENCE, STRICT LIABILITY, OR ANY
                OTHER BASIS, EVEN IF Atom HAS BEEN ADVISED OF THE POSSIBILITY OF
                SUCH DAMAGE. THE FOREGOING LIMITATION OF LIABILITY SHALL APPLY
                TO THE FULLEST EXTENT PERMITTED BY LAW IN THE APPLICABLE
                JURISDICTION.
              </Typography>
              <Typography variant="body2">
                SOME STATES DO NOT ALLOW THE EXCLUSION OR LIMITATION OF
                INCIDENTAL OR CONSEQUENTIAL DAMAGES, SO THE ABOVE LIMITATIONS OR
                EXCLUSIONS MAY NOT APPLY TO YOU. THIS AGREEMENT GIVES YOU
                SPECIFIC LEGAL RIGHTS, AND YOU MAY ALSO HAVE OTHER RIGHTS WHICH
                VARY FROM STATE TO STATE. THE DISCLAIMERS, EXCLUSIONS, AND
                LIMITATIONS OF LIABILITY UNDER THIS AGREEMENT WILL NOT APPLY TO
                THE EXTENT PROHIBITED BY APPLICABLE LAW.
              </Typography>
              <Typography variant="body2">
                The Service is controlled and operated from facilities in the
                United States. Atom makes no representations that the Service is
                appropriate or available for use in other locations. Those who
                access or use the Service from other jurisdictions do so at
                their own volition and are entirely responsible for compliance
                with all applicable United States and local laws and
                regulations, including but not limited to export and import
                regulations. You may not use the Service if you are a resident
                of a country embargoed by the United States, or are a foreign
                person or entity blocked or denied by the United States
                government. Unless otherwise explicitly stated, all materials
                found on the Service are solely directed to individuals,
                companies, or other entities located in the United States.
              </Typography>
              <Typography gutterBottom variant="h6">
                12. Governing Law, Arbitration, and Class Action/Jury Trial
                Waiver
              </Typography>
              <Typography variant="body2">12.1 Governing Law.</Typography>
              <Typography variant="body2">
                You agree that: (i) the Service shall be deemed solely based in
                Delaware; and (ii) the Service shall be deemed a passive one
                that does not give rise to personal jurisdiction over us, either
                specific or general, in jurisdictions other than Delaware. This
                Agreement, the Privacy Policy, and the Service Provider
                Agreement shall be governed by the internal substantive laws of
                the State of Delaware, without respect to its conflict of laws
                principles. The parties acknowledge that this Agreement and the
                Service Provider Agreement evidence a transaction involving
                interstate commerce. Notwithstanding the preceding sentences
                with respect to the substantive law, any arbitration conducted
                pursuant to the terms of this Agreement shall be governed by the
                Federal Arbitration Act (9 U.S.C. §§ 1-16). The application of
                the United Nations Convention on Contracts for the International
                Sale of Goods is expressly excluded. You agree to submit to the
                personal jurisdiction of the federal and state courts located in
                Delaware for any actions for which we retain the right to seek
                injunctive or other equitable relief in a court of competent
                jurisdiction to prevent the actual or threatened infringement,
                misappropriation or violation of a our copyrights, trademarks,
                trade secrets, patents, or other intellectual property or
                proprietary rights, as set forth in the Arbitration provision
                below, including any provisional relief required to prevent
                irreparable harm. You agree that Delaware is the proper forum
                for any appeals of an arbitration award or for trial court
                proceedings in the event that the arbitration provision below is
                found to be unenforceable.
              </Typography>
              <Typography variant="body2">
                Arbitration. READ THIS SECTION CAREFULLY BECAUSE IT REQUIRES THE
                PARTIES TO ARBITRATE THEIR DISPUTES AND LIMITS THE MANNER IN
                WHICH YOU CAN SEEK RELIEF FROM Atom. For any dispute with Atom,
                you agree to first contact us at support@atom.live and attempt
                to resolve the dispute with us informally. In the unlikely event
                that Atom has not been able to resolve a dispute it has with you
                after sixty (60) days, we each agree to resolve any claim,
                dispute, or controversy (excluding any claims for injunctive or
                other equitable relief as provided below) arising out of or in
                connection with or relating to this Agreement, the Privacy
                Policy, and the Service Provider Agreement , or the breach or
                alleged breach thereof (collectively, "Claims"), by binding
                arbitration by JAMS, Inc. ("JAMS"), under the Optional Expedited
                Arbitration Procedures then in effect for JAMS, except as
                provided herein. JAMS may be contacted at www.jamsadr.com. The
                arbitration will be conducted in Delaware, unless you and Atom
                agree otherwise. If you are using the Service for commercial
                purposes, each party will be responsible for paying any JAMS
                filing, administrative and arbitrator fees in accordance with
                JAMS rules, and the award rendered by the arbitrator shall
                include costs of arbitration, reasonable attorneys’ fees and
                reasonable costs for expert and other witnesses. If you are an
                individual using the Service for non-commercial purposes: (i)
                JAMS may require you to pay a fee for the initiation of your
                case, unless you apply for and successfully obtain a fee waiver
                from JAMS; (ii) the award rendered by the arbitrator may include
                your costs of arbitration, your reasonable attorney’s fees, and
                your reasonable costs for expert and other witnesses; and (iii)
                you may sue in a small claims court of competent jurisdiction
                without first engaging in arbitration, but this does not absolve
                you of your commitment to engage in the informal dispute
                resolution process. Any judgment on the award rendered by the
                arbitrator may be entered in any court of competent
                jurisdiction. Nothing in this Section shall be deemed as
                preventing Atom from seeking injunctive or other equitable
                relief from the courts as necessary to prevent the actual or
                threatened infringement, misappropriation, or violation of our
                data security, Intellectual Property Rights or other proprietary
                rights.
              </Typography>
              <Typography variant="body2">
                Class Action/Jury Trial Waiver. WITH RESPECT TO ALL PERSONS AND
                ENTITIES, REGARDLESS OF WHETHER THEY HAVE OBTAINED OR USED THE
                SERVICE FOR PERSONAL, COMMERCIAL OR OTHER PURPOSES, ALL CLAIMS
                MUST BE BROUGHT IN THE PARTIES’ INDIVIDUAL CAPACITY, AND NOT AS
                A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS ACTION,
                COLLECTIVE ACTION, PRIVATE ATTORNEY GENERAL ACTION OR OTHER
                REPRESENTATIVE PROCEEDING. THIS WAIVER APPLIES TO CLASS
                ARBITRATION, AND, UNLESS WE AGREE OTHERWISE, THE ARBITRATOR MAY
                NOT CONSOLIDATE MORE THAN ONE PERSON’S CLAIMS. YOU AGREE THAT,
                BY ENTERING INTO THIS AGREEMENT, YOU AND Atom ARE EACH WAIVING
                THE RIGHT TO A TRIAL BY JURY OR TO PARTICIPATE IN A CLASS
                ACTION, COLLECTIVE ACTION, PRIVATE ATTORNEY GENERAL ACTION, OR
                OTHER REPRESENTATIVE PROCEEDING OF ANY KIND.
              </Typography>
              <Typography gutterBottom variant="h6">
                13. General
              </Typography>
              <Typography gutterBottom variant="h6">
                13.1 Assignment.
              </Typography>
              <Typography variant="body2">
                This Agreement, the Privacy Policy, and the Service Provider
                Agreement, and any rights and licenses granted hereunder or
                thereunder, may not be transferred or assigned by you, but may
                be assigned by Atom without restriction. Any attempted transfer
                or assignment in violation hereof shall be null and void.
              </Typography>
              <Typography gutterBottom variant="h6">
                13.2 Notification Procedures and Changes to the Agreement.
              </Typography>
              <Typography variant="body2">
                Atom may provide notifications, whether such notifications are
                required by law or are for marketing or other business related
                purposes, to you via email notice, written or hard copy notice,
                or through posting of such notice on our website, as determined
                by Atom in our sole discretion. Atom reserves the right to
                determine the form and means of providing notifications to our
                Users, provided that you may opt out of certain means of
                notification as described in this Agreement. Atom is not
                responsible for any automatic filtering you or your network
                provider may apply to email notifications we send to the email
                address you provide us. Atom may, in its sole discretion, modify
                or update this Agreement, the Privacy Policy, or the Service
                Provider Agreement from time to time, and so you should review
                this page periodically. When we change any of these agreements
                in a material manner, we will update the ‘last modified’ date at
                the bottom of this page. Your continued use of the Service after
                any such change constitutes your acceptance of the new terms of
                use. If you do not agree to any of these terms or any future
                terms of use, do not use or access (or continue to access) the
                Service.
              </Typography>
              <Typography gutterBottom variant="h6">
                13.3 Entire Agreement/Severability.
              </Typography>
              <Typography variant="body2">
                This Agreement, together with any amendments and any additional
                agreements you may enter into with Atom in connection with the
                Service, including the Privacy Policy and, if applicable, the
                Service Provider Agreement, shall constitute the entire
                agreement between you and Atom concerning the Service. If any
                provision of this Agreement is deemed invalid by a court of
                competent jurisdiction, the invalidity of such provision shall
                not affect the validity of the remaining provisions of this
                Agreement, which shall remain in full force and effect, except
                that in the event of unenforceability of the universal Class
                Action/Jury Trial Waiver, the entire arbitration agreement shall
                be unenforceable.
              </Typography>
              <Typography gutterBottom variant="h6">
                13.4 No Waiver.
              </Typography>
              <Typography variant="body2">
                No waiver of any term of this Agreement, the Privacy Policy, or
                the Service Provider Agreement shall be deemed a further or
                continuing waiver of such term or any other term, and Atom’s
                failure to assert any right or provision under any of these
                agreements shall not constitute a waiver of such right or
                provision.
              </Typography>
              <Typography gutterBottom variant="h6">
                13.5 Contact.
              </Typography>
              <Typography variant="body2">
                Please contact us support@atom.live with any questions regarding
                this Agreement, the Privacy Policy, or the Service Provider
                Agreement.
              </Typography>
            </Box>
          </Container>
        </Grid>
      </Grid>
    </>
  );
};

Terms.layout = ExternalLayout;

const TermsMobile = () => {
  return (
    <>
      <span>stories</span>
    </>
  );
};

TermsMobile.layout = ExternalLayoutMobile;

const TermsPage = isMobile ? TermsMobile : Terms;

export default Terms;
