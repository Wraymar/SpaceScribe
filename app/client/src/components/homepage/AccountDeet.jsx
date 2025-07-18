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
