const Friends = {
  render: async () => {
    const view = `
        <section class="section">
        <a class="link" href="/#/"><<</a><br>
            <h1 tabindex="0">Friends</h1>
        <p tabindex="0">Search, add and remove friends to share your shopping lists with. (Not implemented.)</p>
        </section>
        `;
    return view;
  },
  after_render: async () => {}
};

export default Friends;
