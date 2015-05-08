PunditTracker Web
=================

Frontend web application for PunditTracker.

### To get up and running:

1. Download this repo with `git clone https://github.com/PunditTracker/web.git`
2. Install node.js and NPM globally if you have not before. [Instructions here](http://blog.nodeknockout.com/post/65463770933/how-to-install-node-js-and-npm)
3. Run `npm install` from root project directory
4. Run `gulp dev` from root project directory to generate the `/build` directory (the compiled application) and start serving the application locally
5. Navigate to `localhost:3000` to view/use the application

### Deploying:

1. Same as above
2. Same as above
3. Same as above
4. Install [ebs-deploy](https://github.com/briandilley/ebs-deploy) with `pip install ebs-deploy` (assuming you have [pip](https://github.com/pypa/pip) installed)
5. **Development:** To deploy to the development staging environment, simply run `gulp deploy`
6. **Production:** To deploy to the production environment, run `gulp deploy --prod` or `gulp deploy --production`
