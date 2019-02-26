let Logout = {
  render: async () => {
    let view = `
      <section class="section">
          <h1>Logged out</h1>
          <p>You've been succesfully logged out!</p>
          <a href="/#/">Log in!</a>
          <p>(If the login feature was implemented, you would now see the applications front page instead of a "logout" page.)</p>
      </section>`;
    return view;
  },
  after_render: async () => {}
};

export default Logout;
