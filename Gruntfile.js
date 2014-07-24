/*global module:false*/
module.exports = function(grunt) {
  "use strict";

  // Project configuration.
  grunt.initConfig({

    connect: {
      server: {
        options: {
          port: 8000,
          hostname: '*',
          base: 'dist',
          livereload: true,
          open: true
        }
      }
    },

    clean: ['dist'],

    watch: {
      files: ['<%= jshint.files %>', 'src/scss/*.scss', 'src/*.html'],
      tasks: 'onChange',
      options: {
        livereload: true
      }
    },

    notify: {
      watch: {
        options: {
          message: 'Changes loaded!',
        }
      },
      server: {
        options: {
          message: 'Server is ready!'
        }
      }
    },

    jshint: {
      files: [
        'src/js/*.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    concat: {
      js: {
        src: [
          'src/components/lodash/dist/lodash.js',
          'src/components/jquery/dist/jquery.min.js',
          'src/components/imagesloaded/imagesloaded.pkgd.min.js',
          'src/components/isInViewport/lib/isInViewport.min.js',
          'src/components/jquery.scrollTo/jquery.scrollTo.min.js',
          'src/components/marked/lib/marked.js',
          'src/components/prism/prism.js',
          'src/app/**/*.js'
        ],
        dest: 'dist/index.min.js',
      },
      css: {
        src: ['src/components/prism/themes/prism.css', 'dist/css/main.min.css'],
        dest: 'dist/css/main.min.css'
    }
    },

    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: {
          'dist/css/main.min.css': 'src/scss/main.scss'
        }
      }
    },

    autoprefixer: {
      single_file: {
        src: 'dist/css/main.min.css'
      },
    },

    cssmin: {
      index: {
        files: {
          'dist/css/main.min.css': [
            'dist/css/main.min.css'
          ]
        }
      }
    },

    uglify: {
      index: {
        src: [
          'dist/index.min.js'
        ],
        dest: 'dist/index.min.js'
      }
    },

    copy: {
      main: {
        expand: true,
        cwd: 'src/',
        src: ['*.html', 'assets/**/*'],
        dest: 'dist/',
        filter: 'isFile'
      },
    },

    'gh-pages': {
      options: {
        base: 'dist'
      },
      src: ['**']
    }

  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-gh-pages');

  // Default task.
  grunt.registerTask('minify', ['jshint', 'uglify', 'cssmin', 'copy']);
  grunt.registerTask('onChange', ['newer:jshint', 'newer:sass', 'newer:autoprefixer:single_file', 'concat', 'newer:copy', 'notify:watch']);
  grunt.registerTask('build', ['clean', 'onChange',]);
  grunt.registerTask('serve', ['clean', 'connect', 'onChange', 'watch']);
  grunt.registerTask('deploy', ['build', 'gh-pages']);

};
