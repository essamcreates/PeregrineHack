const UserInfo = ({ currentUser }) => {
  return (
    <main className="profile-page">
      <section className="relative block h-500-px">
        <div className="absolute top-0 w-full bg-center bg-cover bg-gradient-to-b from-blue-300 to-purple-500">
          <span id="blackOverlay" className="w-full h-full absolute opacity-50 bg-black"></span>
        </div>
      </section>
      <section className="relative py-16 bg-blueGray-200"></section>
    </main>
  );
};

export default UserInfo;
