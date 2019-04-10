const Footer = {
  render: async () => {
    const view = `
          <footer class="footer">
              <div>
                  <p tabindex="0">
                  Footer
                  </p>
              </div>
          </footer>
          `;
    return view;
  },
  after_render: async () => {}
};

export default Footer;
