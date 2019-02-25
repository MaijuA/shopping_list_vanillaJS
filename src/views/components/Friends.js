let Friends = {
  render: async () => {
    let view = `
        <section class="section">
            <h1>Friends</h1>
        <p>Search, add and remove friends to share your shopping lists with</p>
        </section>
        `;
    return view;
  },
  after_render: async () => {}
};

export default Friends;
