function AccountDeet({ imgSrc, username, email }) {
  return (
    <>
      <div className="account">
        <img src={imgSrc} />
        <div className="account_deet">
          <p>{username}</p>
          <p>{email}</p>
        </div>
      </div>
    </>
  );
}

export default AccountDeet;

/* From https://css.glass */
// background: rgba(255, 255, 255, 0.25);
// border-radius: 16px;
// box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
// backdrop-filter: blur(2.7px);
// -webkit-backdrop-filter: blur(2.7px);
// border: 1px solid rgba(255, 255, 255, 0.3);
