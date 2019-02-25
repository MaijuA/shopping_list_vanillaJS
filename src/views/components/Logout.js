let Logout = {
  render: async () => {
    let view = `
      <section class="section">
          <h1>Logged out</h1>
          <p>You've been succesfully logged out!</p>
          <a href="/#/">Log in!</a>
      </section>`;
    return view;
  },
  after_render: async () => {}
};

export default Logout;
