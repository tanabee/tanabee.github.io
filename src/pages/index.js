import React from 'react';
import Layout from '../components/Layout';

// import { Link } from 'gatsby';
import Sidebar from '../components/Sidebar';
import config from '../../config';
import ReactGA from 'react-ga';

ReactGA.initialize('UA-141719032-1');

const Publication = ({ title, href, type, children, image, date }) => (
  <div className="resume-item d-flex flex-column flex-md-row justify-content-between mb-5">
    <div className="resume-content">
      <h3 className="mb-0">
        {type} - <a href={href}>{title}</a>
      </h3>
      <p style={{ marginTop: 16 }}>{children}</p>
    </div>
    <div className="resume-date text-md-right">
      <p className="text-primary">{date}</p>
      <img style={{ width: '17rem' }} src={`../../${image}`} />
    </div>
  </div>
);

const OSS = ({ image, title, href, children }) => (
  <div className="resume-item d-flex flex-column flex-md-row justify-content-between mb-5">
    <div className="resume-content">
      <h3 className="mb-0">
        <a href={href}>{title}</a>
      </h3>
      <p style={{ marginTop: 16 }}>{children}</p>
    </div>
    <div className="resume-date text-md-right">
      {image && <img style={{ width: '17rem' }} src={`../../${image}`} />}
    </div>
  </div>
);

const Project = ({ title, href, children, image }) => (
  <div className="resume-item d-flex flex-column flex-md-row justify-content-between mb-5">
    <div className="resume-content">
      <h3 className="mb-0">{href ? <a href={href}>{title}</a> : title}</h3>
      <p style={{ marginTop: 16 }}>{children}</p>
    </div>
    <div className="resume-date text-md-right">
      <img style={{ width: '17rem' }} src={`../../${image}`} />
    </div>
  </div>
);

const IndexPage = () => (
  <Layout>
    <Sidebar />
    <div className="container-fluid p-0" style={{ background: '#fafafa' }}>
      <section className="resume-section p-3 p-lg-5 d-flex align-items-center" id="about">
        <div className="w-100">
          <h1 className="mb-0">
            {config.firstName}
            <span className="text-primary"> {config.lastName}</span>
          </h1>
          <div className="subheading mb-5">Vice President, RPG TEC. Tokyo / Japan</div>
          <p className="lead mb-5">
            Google Developers Expert, Licensed Scrum Master
            <br />
            Twitter: <a href="https://twitter.com/_tanabee">@_tanabee</a> (ja),{' '}
            <a href="https://twitter.com/tanabee_en">@tanabee_en</a> (en)
          </p>
          <div className="social-icons">
            {config.socialLinks.map((social) => {
              const { icon, url, image } = social;
              return (
                <a key={url} href={url}>
                  {icon ? (
                    <i className={`fab ${icon}`}></i>
                  ) : (
                    <img
                      style={{ width: 24, height: 24, marginBottom: 4 }}
                      src={`../../${image}`}
                    />
                  )}
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <hr className="m-0" />

      <section className="resume-section p-3 p-lg-5 d-flex justify-content-center" id="publication">
        <div className="w-100">
          <h2 className="mb-5">Publication</h2>

          <Publication
            title="GDG DevFest Japan 2020"
            type="Presentation"
            href="https://youtu.be/aBGnfrfBFEc"
            date="2020-10"
            image="devfest2020.jpg"
          >
            GDG DevFest 2020 にて「Google Apps Script 入門 2020」
            というタイトルでオンライン登壇しました
          </Publication>

          <Publication
            title="Top 30 Useful Google Apps Script Snippets"
            type="Article"
            href="https://medium.com/google-developer-experts/top-30-useful-google-apps-script-snippets-8ad13077530f"
            date="2020-10"
            image="apps-script-snippets.png"
          >
            I introduced my favorite 30 Google Apps Script snippets. These snippets will save your
            time. ({' '}
            <a href="https://medium.com/google-developer-experts/top-30-useful-google-apps-script-snippets-8ad13077530f">
              English
            </a>{' '}
            / <a href="https://qiita.com/tanabee/items/5de3e8715be759ce1c7f">Japanese</a> )
          </Publication>

          <Publication
            title="GDG Baku 2019 in Azerbaijan"
            type="Presentation"
            href="https://devfestbaku.firebaseapp.com/speakers/Yuki%20Tanabe/"
            date="2019-12"
            image="gdgbaku2019.jpg"
          >
            Gave a presentation and Hands-on session about Google Apps Script in Baku, Azerbaijan.
          </Publication>

          <Publication
            title="Interviewed by itmedia"
            type="Interview"
            href="https://www.itmedia.co.jp/business/articles/1811/07/news011.html"
            date="2018-11"
            image="interview-globis.jpg"
          >
            ゼロから50人に急増、なぜグロービスは異質のエンジニア採用に成功しているのか？
          </Publication>

          <Publication
            title="Google Cloud Next ’18 in Tokyo"
            type="Presentation"
            href="https://www.youtube.com/watch?v=_8s-ZaS0LLg"
            date="2018-09"
            image="cloudnext18.jpg"
          >
            Cloud Next にて「Google Apps Sctipt で始める PRA」というタイトルで登壇しました
          </Publication>

          <Publication
            title="iOS 8 / Swift study session"
            type="Presentation"
            href="https://techblog.yahoo.co.jp/ios/ios8SwiftStudySession/"
            date="2014-10"
            image="ios8swift.jpg"
          >
            Yahoo! JAPAN にて iOS 8/Swift 勉強会を開催し、「iOS 8 Widget 導入から Tips
            まで」というタイトルで登壇しました。
          </Publication>
        </div>
      </section>

      <hr className="m-0" />

      <section className="resume-section p-3 p-lg-5 d-flex justify-content-center" id="oss">
        <div className="w-100">
          <h2 className="mb-5">Open Source</h2>

          <OSS
            title="tanabee/gas-codelab"
            href="https://github.com/tanabee/gas-codelab"
            image="gas-codelab.png"
          >
            <p>Codelab about Google Apps Script</p>
            <ul>
              <li>
                <a href="https://tanabee.github.io/gas-codelab/en/">English</a>
              </li>
              <li>
                <a href="https://tanabee.github.io/gas-codelab/ja/">Japanese</a>
              </li>
            </ul>
          </OSS>

          <OSS
            title="tanabee/okr-tree"
            href="https://github.com/tanabee/okr-tree"
            image="okr-tree.jpg"
          >
            <p>Visualize OKR tree based on Spreadsheet data using Apps Script</p>
          </OSS>

          <OSS
            title="tanabee/cra-template-*"
            href="https://github.com/tanabee?tab=repositories&q=cra-template-"
          >
            <p>Custom templates of CRA (create-react-app)</p>
            <ul>
              <li>
                <a href="https://github.com/tanabee/cra-template-min">cra-template-min</a>: Minimal
                template
              </li>
              <li>
                <a href="https://github.com/tanabee/cra-template-min">cra-template-mui</a>:
                Material-UI template
              </li>
              <li>
                <a href="https://github.com/tanabee/cra-template-tanabee">cra-template-tanabee</a>:
                My favorite template
              </li>
            </ul>
          </OSS>
        </div>
      </section>

      <hr className="m-0" />

      <section className="resume-section p-3 p-lg-5 d-flex justify-content-center" id="experience">
        <div className="w-100">
          <h2 className="mb-5">Experience</h2>

          <div className="resume-item d-flex flex-column flex-md-row justify-content-between mb-5">
            <div className="resume-content">
              <h3 className="mb-0">Vice President</h3>
              <div className="subheading mb-3">RPG TEC</div>
              <p></p>
            </div>
            <div className="resume-date text-md-right">
              <span className="text-primary">2019-11 - Present</span>
            </div>
          </div>

          <div className="resume-item d-flex flex-column flex-md-row justify-content-between mb-5">
            <div className="resume-content">
              <h3 className="mb-0">Engineering Manager</h3>
              <div className="subheading mb-3">GLOBIS</div>
              <ul>
                <li>Became the first Scrum Master and installed Scrum to all product teams</li>
                <li>
                  Joined the company as the 3rd engineer and increased the number of engineers to 70
                </li>
                <li>Improved internal routine work and reduced work by 500 hours per month</li>
                <li>
                  Installed OKR to my department and developed a tool to visualize goals with Google
                  Apps Script
                </li>
                <li>Designed a data pipeline of learning data using GCP</li>
                <li>Released a learning platform as a product owner</li>
              </ul>
            </div>
            <div className="resume-date text-md-right">
              <span className="text-primary">2017-07 - 2019-10</span>
            </div>
          </div>

          <div className="resume-item d-flex flex-column flex-md-row justify-content-between mb-5">
            <div className="resume-content">
              <h3 className="mb-0">VR Engineer</h3>
              <div className="subheading mb-3">EMBODYME</div>
              <p>Joined the startup and released a social VR application for Oculus, HTC Vive</p>
            </div>
            <div className="resume-date text-md-right">
              <span className="text-primary">2016-08 - 2017-07</span>
            </div>
          </div>

          <div className="resume-item d-flex flex-column flex-md-row justify-content-between">
            <div className="resume-content">
              <h3 className="mb-0">Web Engineer / iOS Lead Engineer</h3>
              <div className="subheading mb-3">Yahoo! JAPAN</div>
              <ul>
                <li>Joined the Yahoo! Map application renewal project as an iOS Lead Engineer</li>
                <li>Released Women's social network app for iOS</li>
                <li>Released an in-house task management service</li>
                <li>
                  Built some private teams and released several iOS apps. Achieved one million
                  downloads
                </li>
              </ul>
            </div>
            <div className="resume-date text-md-right">
              <span className="text-primary">September 2008 - June 2010</span>
            </div>
          </div>
        </div>
      </section>

      <hr className="m-0" />

      <section className="resume-section p-3 p-lg-5 d-flex justify-content-center" id="project">
        <div className="w-100">
          <h2 className="mb-5">Project</h2>

          <Project title="EmbodyMe" image="embodyme.jpg">
            Released a social VR application for Oculus, HTC Vive
          </Project>

          <Project
            title="Yahoo! MAP"
            image="yahoo-map.jpg"
            href="https://itunes.apple.com/jp/app/id289567151?mt=8"
          >
            Renewaled the Yahoo! JAPN MAP application
          </Project>

          <Project
            title="ALPACA"
            image="alpaca.jpg"
            href="https://itunes.apple.com/jp/app/id934444072?mt=8"
          >
            Built small team in private and released to App Store. Delete photos efficiently,
            organize camera roll and save memory
          </Project>
        </div>
      </section>

      <hr className="m-0" />

      <section className="resume-section p-3 p-lg-5 d-flex align-items-center" id="education">
        <div className="w-100">
          <h2 className="mb-5">Education</h2>

          <div className="resume-item d-flex flex-column flex-md-row justify-content-between mb-5">
            <div className="resume-content">
              <h3 className="mb-0">The University of Tokyo</h3>
              <div className="subheading mb-3">MASTER OF PHYSICS</div>
            </div>
            <div className="resume-date text-md-right">
              <span className="text-primary">2009 - 2011</span>
            </div>
          </div>

          <div className="resume-item d-flex flex-column flex-md-row justify-content-between">
            <div className="resume-content">
              <h3 className="mb-0">Keio University</h3>
              <div className="subheading mb-3">BACHELOR OF PHYSICS</div>
            </div>
            <div className="resume-date text-md-right">
              <span className="text-primary">2005 - 2009</span>
            </div>
          </div>
        </div>
      </section>

      <hr className="m-0" />

      <section className="resume-section p-3 p-lg-5 d-flex align-items-center" id="skills">
        <div className="w-100">
          <h2 className="mb-5">Skills</h2>

          <div className="subheading mb-3">Licenses and Certificates</div>
          <ul>
            <li>
              <a href="https://developers.google.com/community/experts/directory/profile/profile-yuki_tanabe">
                Google Developers Expert
              </a>
            </li>
            <li>Licensed Scrum Master</li>
            <li>
              <a href="https://www.coursera.org/account/accomplishments/specialization/3YH4RYBXHBU7">
                Architecting with Google Cloud Platform
              </a>
            </li>
            <li>
              <a href="https://www.coursera.org/account/accomplishments/specialization/3P72E2BF34VC">
                Data Engineering on Google Cloud Platform
              </a>
            </li>
          </ul>

          <div className="subheading mb-3">Favorites</div>
          <p>
            React.js, Google Apps Script, JavaScript, Node.js, Firebase, Python, Google Cloud
            Platform, RPA, Growth Hack, Unity
          </p>
        </div>
      </section>
    </div>
  </Layout>
);

export default IndexPage;
