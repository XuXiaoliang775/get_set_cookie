import GitlabLogo from '@/assets/gitlab.svg';
import CopyIcon from '@/assets/copy.svg';
import CopyIconS from '@/assets/copy-s.svg';
import ArrowIcon from '@/assets/arrow_down.svg';
import GithubIcon from '@/assets/github.svg';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import copy from 'copy-to-clipboard';
import { useEffect, useState } from 'react';
import { getDomain } from '../../config/host';
import { dslog } from 'ds-consolog';
import { clsx } from 'clsx';

function App() {
  const [showCopyied, setShowCopyied] = useState({
    sessid: false,
    accessToken: false,
    setCookie: false,
  });

  const [sessid, setSessid] = useState('');
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    localStorage.setItem('dslog', 'true');
    initCookieInfo();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key.toLowerCase()) {
        case 's':
          sessid && handleCopy('sessid');
          break;
        case 'a':
          accessToken && handleCopy('accessToken');
          break;
        case 'd':
          sessid && handleSetCookie();
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [sessid, accessToken]);
  // const getCookie = () => {
  //   chrome.runtime.sendMessage({ command: "GetCookies" }, async (response) => {
  //     if (chrome.runtime.lastError) {
  //       console.error(chrome.runtime.lastError.message);
  //       return;
  //     }
  //     if (response && response.cookies) {
  //       const [PHPSESSID] = await filterCookie(response.cookies, "PHPSESSID");
  //       console.log("PHPSESSID:", PHPSESSID);
  //       setSessid(PHPSESSID.value);
  //       setAccessToken(btoa(PHPSESSID.value));
  //     }
  //   });
  // };

  async function initCookieInfo() {
    const cookies = await getCookie();
    const [PHPSESSID] = await filterCookie(cookies, 'PHPSESSID');
    setSessid(PHPSESSID?.value);
    setAccessToken(btoa(PHPSESSID?.value));
  }
  async function getCurrentTab() {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    return tab;
  }

  async function getCookie() {
    dslog.method('getCookie');
    const tab = await getCurrentTab();
    const url = new URL(tab.url!);
    dslog.info('url', url);
    const domain = getDomain(url.host);
    dslog.info('domain', domain);
    const cookies = await chrome.cookies.getAll({ domain });
    dslog.info('cookies', cookies);
    return cookies;
  }

  async function filterCookie(
    cookies: chrome.cookies.Cookie[],
    filterKey: string,
  ) {
    console.log(cookies);
    return cookies.filter((cookie) => cookie.name.includes(filterKey));
  }

  const notify = () =>
    toast('Wow Operate successfully!', {
      position: 'bottom-left',
      autoClose: 800,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: '',
      theme: 'colored',
      transition: Bounce,
      toastId: 'customId',
    });

  const handleCopy = (type: 'sessid' | 'accessToken') => {
    setShowCopyied((pre) => ({ ...pre, [type]: true }));
    copy(type === 'sessid' ? sessid : accessToken);
    notify();
    setTimeout(() => {
      setShowCopyied((pre) => ({ ...pre, [type]: false }));
    }, 800);
  };

  const openGitlab = () => {
    chrome.tabs.create({ url: 'https://git.joywok.com/web/ds_cookie_ext' });
  };

  async function setCookie(
    url: string,
    name: string,
    value: string,
    host: string,
  ) {
    const cookie = {
      url,
      name,
      value,
      domain: getDomain(host),
      path: '/',
      secure: false,
      httpOnly: false,
    };
    chrome.cookies.set(cookie, (cookie) => {
      dslog.info('Cookie set:', cookie);
      chrome.tabs.reload();
    });
  }
  const handleSetCookie = async () => {
    setShowCopyied((pre) => ({ ...pre, setCookie: true }));
    const tab = await getCurrentTab();
    const url = new URL(tab.url!);
    const cookieValue = sessid;
    setCookie(url.origin, 'PHPSESSID', cookieValue, url.host);
    setTimeout(() => {
      setShowCopyied((pre) => ({ ...pre, setCookie: false }));
    }, 800);
    notify();
  };

  const openGithub = () => {
    chrome.tabs.create({ url: 'https://github.com/no-ov' });
  };

  return (
    <>
      <div className="card">
        <div className="card-top">
          <img src={GitlabLogo} alt="logo" onClick={openGitlab} />
        </div>

        <div className="card-center">
          <div
            className={clsx('snipet-sessid', { disabled: !accessToken })}
            onClick={() => handleCopy('sessid')}
          >
            <div className="sessid-value ellipsis">{sessid || '未获取到'}</div>
            {sessid && (
              <div className="copy">
                {showCopyied.sessid ? '✔' : <img src={CopyIconS} alt="copy" />}
              </div>
            )}
          </div>

          <div
            className={clsx('snipet-access-token', { disabled: !accessToken })}
            onClick={() => handleCopy('accessToken')}
          >
            <div className="access-token-value ellipsis">
              {accessToken || '未获取到'}
            </div>
            {accessToken && (
              <div className="copy">
                {showCopyied.accessToken ? (
                  '✔'
                ) : (
                  <img src={CopyIcon} alt="copy" />
                )}
              </div>
            )}
          </div>

          <div className={clsx('snipet-set-cookie')}>
            <div className="set-cookie-value ellipsis">
              <input type="text" onChange={(e) => setSessid(e.target.value)} />
            </div>

            <div className="copy" onClick={handleSetCookie}>
              {showCopyied.setCookie ? '✔' : <img src={ArrowIcon} alt="copy" />}
            </div>
          </div>
        </div>
      </div>
      <p className="card-footer" onClick={openGithub}>
        -- xxlwhy775@163.com <img src={GithubIcon} />
      </p>
      <ToastContainer
        stacked
        position="bottom-left"
        autoClose={800}
        limit={2}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;
