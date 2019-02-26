let Footer = {
  render: async () => {
    let view = `
          <footer class="footer">
              <div>
                  <p>
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
