/* 'css/style.css': 'less/main.less',
 'css/header.css': 'less/header.less'*/
module.exports = function (grunt) {
    grunt.initConfig({
        less: {
            development: {
                files: [{'build/css/style.css': 'src/less/style.less'},
                    {'build/css/fonts.css': 'src/less/_fonts.less'},
                    {'build/css/homepage.css': 'src/less/homepage.less'},
                    {'build/css/product_detail.css': 'src/less/product_detail.less'}]
            }
        },
        watch: {
            options: {
                livereload: true
            },
            target: {
                files: ['src/less/**/*.less'],
                tasks: ['less', 'csscomb', 'cssmin']
            }
        },
        cssmin: {
            with_banner: {
                options: {
                    banner: '/* minified CSS */'
                },

                files: [{'build/css/style.min.css': ['build/css/style.css']},
                    {'build/css/fonts.min.css': ['build/css/fonts.css']},
                    {'build/css/homepage.min.css': ['build/css/homepage.css']},
                    {'build/css/product_detail.min.css': ['build/css/product_detail.css']}]
            }
        },
        csscomb: {
            files: {
                'build/css/style.css': ['build/css/style.css'],
                'build/css/font.css': ['build/css/font.css']
            }
        },
        svgmin: {
            symbols: {
                files: [{
                    expand: true,
                    src: ["src/svg/*.svg"]
                }]
            }
        },
        svgstore: {
            options: {
                prefix: 'svg-icon-',
                svg: {
                    style: "display: none"
                }
            },
            symbols: {
                files: {
                    "build/svg/symbols.svg": ["src/svg/*.svg"]
                }
            }
        },
        autoprefixer: {
            options: {
                browsers: ['last 10 versions', 'ie 8', 'ie 9', 'ie 10', 'ie 11']
            },
            target: {
                src: 'build/css/style.css'
                /*dest: 'build/css/homepage.css'*/

            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-csscomb');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-svgmin');
    grunt.loadNpmTasks('grunt-svgstore');
    grunt.loadNpmTasks('grunt-autoprefixer');


    grunt.registerTask('default', ['less', 'autoprefixer', 'csscomb', 'cssmin', 'watch']);
    grunt.registerTask('svg', ['svgmin', 'svgstore', 'svgi']);
    grunt.registerTask('svgi', 'Transform SVG sprites to JS file',
        function () {
            var svg = [], content;

            content = grunt.file.read('build/svg/symbols.svg');
            content = content.replace(/'/g, "\\'");
            content = content.replace(/>\s+</g, "><").trim();
            svg.push("'" + content + "'");
            grunt.file.write('build/js/svg-sprite.js',
                '(function() {var SVG_SPRITE = ' + svg.join('+\n') +
                '; var svgDiv = document.createElement("div"); svgDiv.innerHTML = SVG_SPRITE; svgDiv.className = "svg-sprite"; document.body.insertBefore(svgDiv, document.body.firstChild);})();');
        });


};
