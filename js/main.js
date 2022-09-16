
window.addEventListener("load", function () {
    
    $('.svg').each(function(d,i){
        
        var svgIndex = 'svg_'+d+'_';
        
        var svgObj = $(this)[0];
        
        var newsvg = $(svgObj.contentDocument).find('svg');
        // var originalTransform = newsvg.find("g[id$='_bars']").attr('transform');
        
        // remove title
        newsvg.find('title').remove();
        // newsvg.attr('preserveAspectRatio', 'xMidYMid meet');
        
        // viewbox adjustments
        if(newsvg.attr('viewBox')){
            var viewBoxArr = newsvg.attr('viewBox').split(/(\s+)/);
            viewBoxArr[4] = viewBoxArr[4] - 140;
            viewBoxArr[0] = viewBoxArr[0] + 70;
            newsvg.attr('viewBox',viewBoxArr.join(''));
        }
        
        // newsvg.width(800);
        newsvg.removeAttr('height');
        newsvg.removeAttr('width');
        
        newsvg.find('#red_line').each(function() {
            $(this).addClass('red_line')
        });
        
        newsvg.find('#title-bg').each(function() {
            $(this).addClass('title-bg')
        });

        newsvg.find('#map_title').each(function() {
            $(this).addClass('map-title')
        });
        
        newsvg.find('#question').each(function() {
            $(this).addClass('question')
        });
        
        newsvg.find('#question-title').each(function() {
            $(this).addClass('question-title')
        });
        
        newsvg.find('#question-icon').each(function() {
            $(this).addClass('question-icon')
        });
        
        newsvg.find('#box').each(function() {
            $(this).addClass('recommendation-box')
        });
        
        newsvg.find('#rec-title').each(function() {
            $(this).addClass('recommendation-title')
        });
        
        newsvg.find('#finding').each(function() {
            $(this).addClass('finding')
        });
        
        newsvg.find('#scroll_down').each(function() {
            $(this).addClass('scroll_down')
        });
        
        newsvg.find('defs').children().each(function(dd,ii){
            var originalId = this.id;
            var newId = svgIndex + this.id;
            this.id = newId;
            // remove masks and filters (optional)
            // $(this).remove();
            
            newsvg.find('[filter="url(#'+originalId+')"]').each(function() {
                $(this).attr('filter', 'url(#'+newId+')')
            });
            
            newsvg.find('[fill="url(#'+originalId+')"]').each(function() {
                $(this).attr('fill', 'url(#'+newId+')')
            });
            
            newsvg.find('[mask="url(#'+originalId+')"]').each(function() {
                $(this).attr('mask', 'url(#'+newId+')')
            });
            
            newsvg.find('[xlink\\:href="#'+originalId+'"]').each(function() {
                $(this).attr('xlink:href', '#'+newId+'')
            });
            
        })
        
        // newsvg.attr('width', '100%').attr('height', '100%').attr('data-transform', originalTransform)
        svgObj.replaceWith(newsvg[0]);
        
    });
    
    
    $('#bubble1,#bubble2,#bubble3,#bubble4,#bubble5,#bubble6,#bubble7,#bubble8,#bubble9').addClass('bubble');
    $('#intro_bubble1,#intro_bubble2,#intro_bubble3,#intro_bubble4,#intro_bubble5,#intro_bubble6,#intro_bubble7,#intro_bubble8,#intro_bubble9').addClass('intro_bubble');
    $('#demography_icons g').addClass('demo_icon');
    $('#people_icons g').addClass('people_icon');
    
    
    
    $(document).ready(function () {
        
        // section nav bar offset
        
        var vOffset = $('#nav svg').height() - 20;
        var vOffsetSub = $('#nav svg').height() + 10;
        
        $( window ).resize(function() {
            vOffset = $('#nav svg').height() - 20;
            vOffsetSub = $('#nav svg').height() + 10;
        });
        
        // var vOffset = 15;
        
        // BACKGROUND PARALLAX 
        gsap.utils.toArray("section").forEach((section, i) => {
            
            section.bg = section.querySelector(".bg"); 
            
            // Do the parallax effect on each section
            if (i) {
                section.bg.style.backgroundPosition = `50% ${-innerHeight / 2}px`;
                
                gsap.to(section.bg, {
                    backgroundPosition: `50% ${innerHeight / 2}px`,
                    ease: "none",
                    scrollTrigger: {
                        trigger: section,
                        scrub: true
                    }
                });
            } 
            
            // the first image should be positioned against the top. Use px on the animating part to work with GSAP. 
            else {
                section.bg.style.backgroundPosition = "50% 0px"; 
                
                gsap.to(section.bg, {
                    backgroundPosition: `50% ${innerHeight / 2}px`,
                    ease: "none",
                    scrollTrigger: {
                        trigger: section,
                        start: "top top", 
                        end: "bottom top",
                        scrub: true
                    }
                });
            }
        });
        
        // MAIN FINDINGS ANIMATION
        
        const findings = gsap.utils.toArray('.finding');
        gsap.set(findings, {autoAlpha: 0  });
        
        findings.forEach((box, i) => {
            const anim = gsap.to(box, {duration: 1.7, autoAlpha: 1, paused: true});
            ScrollTrigger.create({
                trigger: box,
                start: "top top+=105%",
                end: "bottom top",
                fastScrollEnd: false,
                markers: false,
                onEnter: self => {
                    self.progress === 1 ? anim.progress(1) : anim.play()
                },
                onLeaveBack: self => {
                    anim.reverse();
                }
            });
        });
        
        // SCROLL DOWN ANIMATION
        
        const scroll_down = gsap.utils.toArray('.scroll_down');
        gsap.set(scroll_down, {autoAlpha: 0, y: 90  });
        
        scroll_down.forEach((box, i) => {
            const anim = gsap.to(box, {duration: 3.4, autoAlpha: 1, y: -30, paused: true});
            ScrollTrigger.create({
                trigger: box,
                start: "top top+=110%",
                end: "bottom top-=10%",
                fastScrollEnd: true,
                markers: false,
                onEnter: self => {
                    self.progress === 1 ? anim.progress(1) : anim.play()
                },
                onLeaveBack: self => {
                    anim.reverse();
                }
            });
        });
        
        
        
        // SURVEY QUESTION ANIMATION
        
        const questions = gsap.utils.toArray('.question-icon');
        gsap.set(questions, {autoAlpha: 0, x: -30, y:5, scale: 0.7 });
        
        questions.forEach((box, i) => {
            const anim = gsap.to(box, {duration: 0.8, delay: 0.3, autoAlpha: 1, x: 0, scale: 1.05, y:0, paused: true});
            ScrollTrigger.create({
                trigger: box,
                end: "center 300px",
                markers: false,
                onEnter: self => {
                    anim.progress(0);
                    self.progress === 1 ? anim.progress(1) : anim.play()
                },
                onLeaveBack: self => {
                    anim.reverse()
                }
            });
        });
        
        const questionsTitles = gsap.utils.toArray('.question-title');
        gsap.set(questionsTitles, {autoAlpha: 0, x: 0, y: 10  });
        
        questionsTitles.forEach((box, i) => {
            const anim = gsap.to(box, {duration: 1.3, delay: 0.5, x: 0, y: 0, autoAlpha: 1, paused: true});
            ScrollTrigger.create({
                trigger: box,
                end: "center 300px",
                markers: false,
                onEnter: self => {
                    anim.progress(0);
                    self.progress === 1 ? anim.progress(1) : anim.play()
                },
                onLeaveBack: self => {
                    anim.reverse()
                }
            });
        });
        
        
        // MAP RED-LINE
        
        const redLine = gsap.utils.toArray('.red_line');
        gsap.set(redLine, {autoAlpha: 1, scaleX: 0 });
        
        redLine.forEach((box, i) => {
            const anim = gsap.to(box, {duration: 1.5, autoAlpha: 1, scaleX: 0.99, x:-1, paused: true});
            ScrollTrigger.create({
                trigger: box,
                start: "top top+=50%",
                end: "center 300px",
                markers: false,
                onEnter: self => {
                    self.progress === 1 ? anim.progress(1) : anim.play()
                },
                onLeaveBack: self => {
                    anim.reverse()
                }
            });
        });
        
        // TITLE BG-LINE
        
        const titleBgLine = gsap.utils.toArray('.title-bg');
        gsap.set(titleBgLine, {autoAlpha: 1, scaleX: 0 });
        
        titleBgLine.forEach((box, i) => {
            const anim = gsap.to(box, {duration: 0.7, autoAlpha: 1, scaleX: 0.99, x:-1, paused: true});
            ScrollTrigger.create({
                trigger: box,
                start: "top top+=70%",
                // end: "center 300px",
                markers: false,
                onEnter: self => {
                    self.progress === 1 ? anim.progress(1) : anim.play()
                },
                onLeaveBack: self => {
                    anim.reverse()
                }
            });
        });

        // MAP TITLE
        
        // const mapTitle = gsap.utils.toArray('.map');
        // // gsap.set(mapTitle, {autoAlpha: 1 });
        
        // mapTitle.forEach((box, i) => {
        //     // const anim = gsap.to(box, {duration: 0.7, autoAlpha: 1, scaleX: 0.99, x:-1, paused: true});
        //     ScrollTrigger.create({
        //         trigger: box,
        //         start: "top top",
        //         pin: true,
        //         // end: "center 300px",
        //         markers: false,

        //     });
        // });
        
        
        // NAVIGATION
        
        $('#subnav').css('top', $('#nav svg').height());
        
        $( window ).resize(function() {
            $('#subnav').css('top', $('#nav svg').height());
        });
        
        // scrolling highlight text
        gsap.timeline({
            scrollTrigger: {
                trigger: "#background",
                start: "top-="+(vOffset+100)+ " top",
                end: "bottom-="+(vOffset+99)+" top",
                markers: false,
                onEnter: function(){
                    $('#link_text_background, #link_text_keyfindings, #link_text_recommendations, #link_text_publications, #link_text_methodology, #link_text_references').attr('font-weight', 'normal').attr('transform', 'translate(0,0)');
                    $('#link_text_background').attr('font-weight', 'bold').attr('transform', 'translate(-2.2,0)')
                    // window.history.pushState(null, null, '#background');
                },
                onEnterBack: function(){
                    $('#link_text_background, #link_text_keyfindings, #link_text_recommendations, #link_text_publications, #link_text_methodology, #link_text_references').attr('font-weight', 'normal').attr('transform', 'translate(0,0)');
                    $('#link_text_background').attr('font-weight', 'bold').attr('transform', 'translate(-2.2,0)')
                    // window.history.pushState(null, null, '#background');
                }
                
            }
        });
        
        gsap.timeline({
            scrollTrigger: {
                trigger: "#keyfindings",
                start: "top-="+(vOffset+100)+ " top",
                end: "bottom-="+(vOffset+99)+" top",
                markers: false,
                onEnter: function(){
                    $('#link_text_background, #link_text_keyfindings, #link_text_recommendations,#link_text_publications, #link_text_methodology, #link_text_references').attr('font-weight', 'normal').attr('transform', 'translate(0,0)');
                    $('#link_text_keyfindings').attr('font-weight', 'bold').attr('transform', 'translate(-2.2,0)')
                    // window.history.pushState(null, null, '#keyfindings');
                },
                onEnterBack: function(){
                    $('#link_text_background, #link_text_keyfindings, #link_text_recommendations, #link_text_publications, #link_text_methodology, #link_text_references').attr('font-weight', 'normal').attr('transform', 'translate(0,0)');
                    $('#link_text_keyfindings').attr('font-weight', 'bold').attr('transform', 'translate(-2.2,0)')
                    // window.history.pushState(null, null, '#keyfindings');
                }
            }
        });
        
        gsap.timeline({
            scrollTrigger: {
                trigger: "#recommendations",
                start: "top-="+(vOffset+100)+ " top",
                end: "bottom-="+(vOffset+99)+" top",
                markers: false,
                onEnter: function(){
                    $('#link_text_background, #link_text_keyfindings, #link_text_recommendations, #link_text_publications, #link_text_methodology, #link_text_references').attr('font-weight', 'normal').attr('transform', 'translate(0,0)');
                    $('#link_text_recommendations').attr('font-weight', 'bold').attr('transform', 'translate(-2.2,0)')
                    // window.history.pushState(null, null, '#recommendations');
                },
                onEnterBack: function(){
                    $('#link_text_background, #link_text_keyfindings, #link_text_recommendations, #link_text_publications, #link_text_methodology, #link_text_references').attr('font-weight', 'normal').attr('transform', 'translate(0,0)');
                    $('#link_text_recommendations').attr('font-weight', 'bold').attr('transform', 'translate(-2.2,0)')
                    // window.history.pushState(null, null, '#recommendations');
                }
            }
        });
        
        gsap.timeline({
            scrollTrigger: {
                trigger: "#publications",
                start: "top-="+(vOffset+100)+ " top",
                end: "bottom-="+(vOffset+99)+" top",
                markers: false,
                onEnter: function(){
                    $('#link_text_background, #link_text_keyfindings, #link_text_recommendations, #link_text_publications, #link_text_methodology, #link_text_references').attr('font-weight', 'normal').attr('transform', 'translate(0,0)');
                    $('#link_text_publications').attr('font-weight', 'bold').attr('transform', 'translate(-2.2,0)')
                    // window.history.pushState(null, null, '#methodology');
                },
                onEnterBack: function(){
                    $('#link_text_background, #link_text_keyfindings, #link_text_recommendations, #link_text_publications, #link_text_methodology, #link_text_references').attr('font-weight', 'normal').attr('transform', 'translate(0,0)');
                    $('#link_text_publications').attr('font-weight', 'bold').attr('transform', 'translate(-2.2,0)')
                    // window.history.pushState(null, null, '#methodology');
                }
            }
        });
        
        gsap.timeline({
            scrollTrigger: {
                trigger: "#methodology",
                start: "top-="+(vOffset+100)+ " top",
                end: "bottom-="+(vOffset+99)+" top",
                markers: false,
                onEnter: function(){
                    $('#link_text_background, #link_text_keyfindings, #link_text_recommendations, #link_text_publications, #link_text_methodology, #link_text_references').attr('font-weight', 'normal').attr('transform', 'translate(0,0)');
                    $('#link_text_methodology').attr('font-weight', 'bold').attr('transform', 'translate(-2.2,0)')
                    // window.history.pushState(null, null, '#methodology');
                },
                onEnterBack: function(){
                    $('#link_text_background, #link_text_keyfindings, #link_text_recommendations, #link_text_publications, #link_text_methodology, #link_text_references').attr('font-weight', 'normal').attr('transform', 'translate(0,0)');
                    $('#link_text_methodology').attr('font-weight', 'bold').attr('transform', 'translate(-2.2,0)')
                    // window.history.pushState(null, null, '#methodology');
                }
            }
        });
        
        gsap.timeline({
            scrollTrigger: {
                trigger: "#references",
                start: "top-="+(vOffset+100)+ " top",
                end: "bottom-="+(vOffset+99)+" top",
                markers: false,
                onEnter: function(){
                    $('#link_text_background, #link_text_keyfindings, #link_text_recommendations, #link_text_publications, #link_text_methodology, #link_text_references').attr('font-weight', 'normal').attr('transform', 'translate(0,0)');
                    $('#link_text_references').attr('font-weight', 'bold').attr('transform', 'translate(-2.2,0)')
                    // window.history.pushState(null, null, '#references');
                },
                onEnterBack: function(){
                    $('#link_text_background, #link_text_keyfindings, #link_text_recommendations, #link_text_publications, #link_text_methodology, #link_text_references').attr('font-weight', 'normal').attr('transform', 'translate(0,0)');
                    $('#link_text_references').attr('font-weight', 'bold').attr('transform', 'translate(-2.2,0)')
                    // window.history.pushState(null, null, '#references');
                }
            }
        });
        
        $('#link_home, #link_background, #link_keyfindings, #link_recommendations, #link_publications, #link_methodology, #link_references').hover(function(){
            var id = this.id.substring(5);
            $('#bg_'+id).attr('opacity', 1);
        }, function(){
            $('#bg_home, #bg_background, #bg_keyfindings, #bg_recommendations, #bg_publications, #bg_methodology, #bg_references').attr('opacity', 0);
        });
        
        $('#link_home').click(function(){
            $('html, body').animate({
                scrollTop: $("#home").offset().top
            }, 'fast');
            history.replaceState(null, null, ' ');
        });
        
        $('#link_background').click(function(){
            $('html, body').animate({
                scrollTop: $("#background").offset().top-vOffset
            }, 'fast');
            window.history.pushState(null, null, '#background');
        });
        
        $('#link_keyfindings').click(function(){
            $('html, body').animate({
                scrollTop: $("#keyfindings").offset().top-vOffset
            }, 'fast');
            window.history.pushState(null, null, '#keyfindings');
        });
        
        $('#link_recommendations').click(function(){
            $('html, body').animate({
                scrollTop: $("#recommendations").offset().top-vOffset
            }, 'fast');
            window.history.pushState(null, null, '#recommendations');
        });
        
        $('#link_publications').click(function(){
            $('html, body').animate({
                scrollTop: $("#publications").offset().top-vOffset
            }, 'fast');
            window.history.pushState(null, null, '#publications');
        });
        
        $('#link_methodology').click(function(){
            $('html, body').animate({
                scrollTop: $("#methodology").offset().top-vOffset
            }, 'fast');
            window.history.pushState(null, null, '#methodology');
        });
        
        $('#link_references').click(function(){
            $('html, body').animate({
                scrollTop: $("#references").offset().top-vOffset
            }, 'fast');
            window.history.pushState(null, null, '#references');
        });
        
        // SUB-NAV
        
        gsap.timeline({
            scrollTrigger: {
                trigger: "#vaccines",
                start: "top-="+(vOffsetSub+100)+ " top",
                end: "bottom-="+(vOffsetSub+99)+" top",
                markers: false,
                onEnter: function(){
                    $('#link_text_vaccines, #link_text_trust, #link_text_accesstoinformation, #link_text_socioeconomicimpacts').attr('fill', 'black');
                    $('#link_bg_vaccines, #link_bg_trust, #link_bg_accesstoinformation, #link_bg_socioeconomicimpacts').attr('fill', '#E1E1E1');
                    $('#link_text_vaccines').attr('fill', 'white');
                    $('#link_bg_vaccines').attr('fill', '#EB313C');
                    // window.history.pushState(null, null, '#vaccines');
                },
                onEnterBack: function(){
                    $('#link_text_vaccines, #link_text_trust, #link_text_accesstoinformation, #link_text_socioeconomicimpacts').attr('fill', 'black');
                    $('#link_bg_vaccines, #link_bg_trust, #link_bg_accesstoinformation, #link_bg_socioeconomicimpacts').attr('fill', '#E1E1E1');
                    $('#link_text_vaccines').attr('fill', 'white');
                    $('#link_bg_vaccines').attr('fill', '#EB313C');
                    // window.history.pushState(null, null, '#vaccines');
                }
            }
        });
        
        gsap.timeline({
            scrollTrigger: {
                trigger: "#trust",
                start: "top-="+(vOffsetSub+100)+ " top",
                end: "bottom-="+(vOffsetSub+99)+" top",
                markers: false,
                onEnter: function(){
                    $('#link_text_vaccines, #link_text_trust, #link_text_accesstoinformation, #link_text_socioeconomicimpacts').attr('fill', 'black');
                    $('#link_bg_vaccines, #link_bg_trust, #link_bg_accesstoinformation, #link_bg_socioeconomicimpacts').attr('fill', '#E1E1E1');
                    $('#link_text_trust').attr('fill', 'white');
                    $('#link_bg_trust').attr('fill', '#EB313C');
                    // window.history.pushState(null, null, '#trust');
                },
                onEnterBack: function(){
                    $('#link_text_vaccines, #link_text_trust, #link_text_accesstoinformation, #link_text_socioeconomicimpacts').attr('fill', 'black');
                    $('#link_bg_vaccines, #link_bg_trust, #link_bg_accesstoinformation, #link_bg_socioeconomicimpacts').attr('fill', '#E1E1E1');
                    $('#link_text_trust').attr('fill', 'white');
                    $('#link_bg_trust').attr('fill', '#EB313C');
                    // window.history.pushState(null, null, '#trust');
                }
            }
        });
        
        gsap.timeline({
            scrollTrigger: {
                trigger: "#accesstoinformation",
                start: "top-="+(vOffsetSub+100)+ " top",
                end: "bottom-="+(vOffsetSub+99)+" top",
                markers: false,
                onEnter: function(){
                    $('#link_text_vaccines, #link_text_trust, #link_text_accesstoinformation, #link_text_socioeconomicimpacts').attr('fill', 'black');
                    $('#link_bg_vaccines, #link_bg_trust, #link_bg_accesstoinformation, #link_bg_socioeconomicimpacts').attr('fill', '#E1E1E1');
                    $('#link_text_accesstoinformation').attr('fill', 'white');
                    $('#link_bg_accesstoinformation').attr('fill', '#EB313C');
                    // window.history.pushState(null, null, '#accesstoinformation');
                },
                onEnterBack: function(){
                    $('#link_text_vaccines, #link_text_trust, #link_text_accesstoinformation, #link_text_socioeconomicimpacts').attr('fill', 'black');
                    $('#link_bg_vaccines, #link_bg_trust, #link_bg_accesstoinformation, #link_bg_socioeconomicimpacts').attr('fill', '#E1E1E1');
                    $('#link_text_accesstoinformation').attr('fill', 'white');
                    $('#link_bg_accesstoinformation').attr('fill', '#EB313C');
                    // window.history.pushState(null, null, '#accesstoinformation');
                }
            }
        });
        
        gsap.timeline({
            scrollTrigger: {
                trigger: "#socioeconomicimpacts",
                start: "top-="+(vOffsetSub+100)+ " top",
                end: "bottom-="+(vOffsetSub+99)+" top",
                markers: false,
                onEnter: function(){
                    $('#link_text_vaccines, #link_text_trust, #link_text_accesstoinformation, #link_text_socioeconomicimpacts').attr('fill', 'black');
                    $('#link_bg_vaccines, #link_bg_trust, #link_bg_accesstoinformation, #link_bg_socioeconomicimpacts').attr('fill', '#E1E1E1');
                    $('#link_text_socioeconomicimpacts').attr('fill', 'white');
                    $('#link_bg_socioeconomicimpacts').attr('fill', '#EB313C');
                    // window.history.pushState(null, null, '#socioeconomicimpacts');
                },
                onEnterBack: function(){
                    $('#link_text_vaccines, #link_text_trust, #link_text_accesstoinformation, #link_text_socioeconomicimpacts').attr('fill', 'black');
                    $('#link_bg_vaccines, #link_bg_trust, #link_bg_accesstoinformation, #link_bg_socioeconomicimpacts').attr('fill', '#E1E1E1');
                    $('#link_text_socioeconomicimpacts').attr('fill', 'white');
                    $('#link_bg_socioeconomicimpacts').attr('fill', '#EB313C');
                    // window.history.pushState(null, null, '#socioeconomicimpacts');
                }
            }
        });
        
        $('#link_vaccines, #link_trust, #link_accesstoinformation, #link_socioeconomicimpacts').hover(function(){
            var id = this.id.substring(5);
            if( $('#link_bg_'+id).attr('fill') == '#EB313C'){
                $('#link_bg_'+id).attr('opacity', 0.93);
            } else {
                $('#link_bg_'+id).attr('opacity', 0.6);
            }
        }, function(){
            $('#link_bg_vaccines, #link_bg_trust, #link_bg_accesstoinformation, #link_bg_socioeconomicimpacts').attr('opacity', 1);
        });
        
        
        $('#link_vaccines').click(function(){
            $('html, body').animate({
                scrollTop: $("#vaccines").offset().top-vOffsetSub
            }, 'fast');
            window.history.pushState(null, null, '#vaccines');
            $('#link_bg_vaccines').attr('opacity', 1);
        });
        
        $('#link_trust').click(function(){
            $('html, body').animate({
                scrollTop: $("#trust").offset().top-vOffsetSub
            }, 'fast');
            window.history.pushState(null, null, '#trust');
            $('#link_bg_trust').attr('opacity', 1);
        });
        
        $('#link_accesstoinformation').click(function(){
            $('html, body').animate({
                scrollTop: $("#accesstoinformation").offset().top-vOffsetSub
            }, 'fast');
            window.history.pushState(null, null, '#accesstoinformation');
            $('#link_bg_accesstoinformation').attr('opacity', 1);
        });
        
        $('#link_socioeconomicimpacts').click(function(){
            $('html, body').animate({
                scrollTop: $("#socioeconomicimpacts").offset().top-vOffsetSub
            }, 'fast');
            window.history.pushState(null, null, '#socioeconomicimpacts');
            $('#link_bg_socioeconomicimpacts').attr('opacity', 1);
        });
        
        
        // END OF SUB-NAV KEYFINDINGS
        
        const subnav = gsap.timeline( { 
            
            scrollTrigger: {
                trigger: "#end-key-findings",
                start: "+=533 80%",
                scrub: true,
                markers: false,
                toggleActions: "play reverse play reverse",
            }
            
        });
        
        subnav
        .to('#subnav', { opacity: 1, y: -50 })
        
        
        // RECOMMNDATION BOX ANIMATION
        
        const recommendationTitle = gsap.utils.toArray('.recommendation-title');
        gsap.set(recommendationTitle, {autoAlpha: 0, y:20, scale: 1 });
        
        recommendationTitle.forEach((box, i) => {
            const anim = gsap.to(box, {duration: 1.2, autoAlpha: 1, scale: 1, y:0, paused: true});
            ScrollTrigger.create({
                trigger: box,
                end: "center 300px",
                markers: false,
                onEnter: self => {
                    self.progress === 1 ? anim.progress(1) : anim.play()
                },
                onLeaveBack: self => {
                    anim.reverse()
                }
            });
        });
        
        const recommendationBox = gsap.utils.toArray('.recommendation-box');
        gsap.set(recommendationBox, {autoAlpha: 0, y:200, scale: 1 });
        
        recommendationBox.forEach((box, i) => {
            const anim = gsap.to(box, {duration: 1.2, autoAlpha: 1, scale: 1, y:0, paused: true});
            ScrollTrigger.create({
                trigger: box,
                end: "center 300px",
                markers: false,
                onEnter: self => {
                    self.progress === 1 ? anim.progress(1) : anim.play()
                },
                onLeaveBack: self => {
                    anim.reverse()
                }
            });
        });
        
        // map intro animatiom
        
        gsap.set('.intro_bubble', {
            opacity: 0,
            scale: 0.1,
            transformOrigin: "center"
        })
        
        gsap.set('#intromap #circles', {
            opacity: 0
        })
        
        const tl = gsap.timeline( { 
            
            scrollTrigger: {
                trigger: ".intro_bubble",
                start: "top 70%",
                scrub: false,
                markers: false,
                toggleActions: "play reverse play reverse",
            }
            
        });
        
        tl.to('.intro_bubble', { opacity: 1, scale: 1, duration: 1.2, stagger: 0.12 })
        
        
        
        
        // map background animatiom
        
        gsap.set('.bubble', {
            opacity: 0,
            scale: 0.1,
            transformOrigin: "center"
        })
        
        gsap.set('#survey_values', {
            opacity: 0
        })
        
        gsap.set('#background_map #tooltips', {
            opacity: 0
        })
        
        gsap.set('#background_map #circles', {
            opacity: 0
        })
        
        
        const tl_background = gsap.timeline( { 
            
            scrollTrigger: {
                trigger: "#background_map",
                start: "top 70%",
                scrub: false,
                markers: false,
                toggleActions: "play reverse play reverse",
            }
            
        });
        
        tl_background
        .to('.bubble', { opacity: 1, scale: 1, duration: 1.2, stagger: 0.12 })
        
        tl_background
        .to('#survey_values', { opacity: 1, delay: -1, duration: 0.6 })
        
        tl_background
        .to('#background_map #tooltips', { opacity: 1, delay: -1, duration: 0.6 })
        .to('#background_map #circles', { opacity: 1, delay: -1, duration: 0.6 })
        
        
        // map tooltips
        
        $('#hotspot_arg, #hotspot_bol, #hotspot_bra, #hotspot_col, #hotspot_gtm, #hotspot_jam, #hotspot_nic, #hotspot_pan, #hotspot_tto').hover(function(){
            var iso = this.id.slice(-3);
            $('#background_map #'+iso+'_circle').animate({'opacity': 1}, 'fast');
            $('#background_map #tooltips #'+iso).stop(true, true).delay(200).animate({'opacity': 1}, 'fast');
        }, function(){
            var iso = this.id.slice(-3);
            $('#background_map #'+iso+'_circle').animate({'opacity': 0}, 'fast');
            $('#background_map #tooltips #'+iso).stop(true, true).delay(200).animate({'opacity': 0}, 'fast');
        } );
        
        
        // vaccine people icons
        
        gsap.set('.people_icon', {
            opacity: 0,
            scale: 0.2,
            transformOrigin: "center"
        })
        
        const tl_people_icons = gsap.timeline( { 
            
            scrollTrigger: {
                trigger: "#people_icons",
                start: "+=133 80%",
                end: "+=733",
                scrub: false,
                markers: false,
                toggleActions: "play reverse play reverse",
            }
            
        });
        
        tl_people_icons
        .to('.people_icon', { opacity: 1, scale: 1, duration: 1, 
            ease: "power1.inOut",
            stagger: {
                grid: [5,20],
                from: "random",
                // axis: "x",
                amount: 0.4
            }})
            
            
            // demography icons
            
            gsap.set('.demo_icon', {
                opacity: 0,
                scale: 0.2,
                transformOrigin: "center"
            })
            
            const tl_demography_icons = gsap.timeline( { 
                
                scrollTrigger: {
                    trigger: "#demography_icons",
                    start: "+=133 80%",
                    end: "+=733",
                    scrub: false,
                    markers: false,
                    toggleActions: "play reverse play reverse",
                }
                
            });
            
            tl_demography_icons
            .to('.demo_icon', { opacity: 1, scale: 1, duration: 1, 
                ease: "power1.inOut",
                stagger: {
                    grid: [5,20],
                    from: "random",
                    // axis: "x",
                    amount: 0.4
                }})
                
                // population pyramid
                
                // gsap.set('#pyramid_bars', {
                //     // opacity: 0,
                //     scaleX: 0,
                //     transformOrigin: "center"
                // });
                
                // gsap.set('#pyramid_labels', {
                //     opacity: 0
                // })
                
                // const pyramid_tl = gsap.timeline( { 
                //     scrollTrigger: {
                //         trigger: "#pyramid_bars",
                //         start: "+=133 80%",
                //         scrub: false,
                //         markers: false,
                //         toggleActions: "play reverse play reverse",
                //     }
                // });
                
                // pyramid_tl
                // .to('#pyramid_bars', { opacity: 1, scaleX: 1, duration: 1.4})
                
                // pyramid_tl
                // .to('#pyramid_labels', { opacity: 1, delay: -0.5, duration: 1.5 })
                
                
                // // residence chart
                
                // gsap.set('#residence_bars', {
                //     // opacity: 0,
                //     scaleX: 0,
                //     transformOrigin: "left"
                // });
                
                // gsap.set('#residence_labels', {
                //     opacity: 0
                // })
                
                // const residence_tl = gsap.timeline( { 
                //     scrollTrigger: {
                //         trigger: "#residence_bars",
                //         start: "+=133 80%",
                //         scrub: false,
                //         markers: false,
                //         toggleActions: "play reverse play reverse",
                //     }
                // });
                
                // residence_tl
                // .to('#residence_bars', { opacity: 1, scaleX: 1, duration: 1.8})
                
                // residence_tl
                // .to('#residence_labels', { opacity: 1, delay: -0.5, duration: 1.8 })
                
                // residence chart hover effects
                
                $('#info_asylum_seeker, #info_refugee, #info_host, #info_idp, #info_migrant').attr('opacity', 0);
                $('#hover_idp').hover(function(){$('#info_idp').animate({'opacity': 1});},function(){$('#info_idp').animate({'opacity': 0}, 'fast');})
                $('#hover_refugee').hover(function(){$('#info_refugee').animate({'opacity': 1});},function(){$('#info_refugee').animate({'opacity': 0}, 'fast');})
                $('#hover_migrant').hover(function(){$('#info_migrant').animate({'opacity': 1});},function(){$('#info_migrant').animate({'opacity': 0}, 'fast');})
                $('#hover_host').hover(function(){$('#info_host').animate({'opacity': 1});},function(){$('#info_host').animate({'opacity': 0}, 'fast');})
                $('#hover_asylum_seeker').hover(function(){$('#info_asylum_seeker').animate({'opacity': 1});},function(){$('#info_asylum_seeker').animate({'opacity': 0}, 'fast');})
                
                
                
                // pie ingigenous
                
                gsap.set('#pie_indigenous', {
                    transformOrigin: "center",
                    rotate: 45,
                });
                
                gsap.set('#pie_indigenous_labels', {
                    opacity: 0
                });
                
                const pie_indigenous_tl = gsap.timeline( { 
                    scrollTrigger: {
                        trigger: "#pie_indigenous",
                        start: "+=133 80%",
                        scrub: false,
                        markers: false,
                        toggleActions: "play reverse play reverse",
                    }
                });
                
                pie_indigenous_tl
                .to('#pie_indigenous', { opacity: 1, rotate: 0, duration: 1.5})
                
                pie_indigenous_tl
                .to('#pie_indigenous_labels', { opacity: 1, delay: -1, duration: 1.5 })
                
                
                // DOCUMENT DOWNLOADS
                $('#download_summary').click(function(){
                    window.open('https://communityengagementhub.org/resource/summary-of-covid-19-in-the-americas-listening-to-the-most-vulnerable/', '_blank').focus();
                })

                $('#download_summary_es').click(function(){
                    window.open('https://communityengagementhub.org/es/resource/estudio-regional-de-america-sobre-covid-19/', '_blank').focus();
                })
                
                $('#link_dashboard').click(function(){
                    window.open('https://go.ifrc.org/emergencies/4379#surveys', '_blank').focus();
                })
                
                $('#download_full').click(function(){
                    window.open('https://communityengagementhub.org/resource/covid-19-in-the-americas-listening-to-the-most-vulnerable/', '_blank').focus();
                })

                $('#download_full_es').click(function(){
                    window.open('https://communityengagementhub.org/es/resource/estudio-regional-de-america-sobre-covid-19/', '_blank').focus();
                })
                
                $('#download_ns1').click(function(){
                    window.open('https://communityengagementhub.org/es/resource/encuestas-de-percepcion-sobre-la-aceptacion-de-la-vacuna-covid-19-en-las-comunidades-originarias-y-urbanas/', '_blank').focus();
                })
                
                $('#download_ns2').click(function(){
                    window.open('https://communityengagementhub.org/es/resource/el-impacto-de-covid-19-en-las-poblaciones-vulnerables-de-migrantes-e-indigenas-estudio-de-percepcion-de-america-guatemala/', '_blank').focus();
                })
                
                $('#download_ns3').click(function(){
                    window.open('https://communityengagementhub.org/es/resource/el-impacto-de-covid-19-en-poblaciones-vulnerables-estudio-de-percepcion-de-america-bolivia/', '_blank').focus();
                })
                
                $('#download_ns4').click(function(){
                    window.open('https://communityengagementhub.org/es/resource/el-impacto-de-covid-19-en-las-poblaciones-vulnerables-de-migrantes-estudio-de-percepcion-en-argentina/', '_blank').focus();
                })
                
                $('#download_ns5').click(function(){
                    window.open('https://communityengagementhub.org/es/resource/el-impacto-de-la-covid-19-en-poblaciones-vulnerables-personas-de-bajos-ingresos-migrantes-y-personas-de-la-tercera-edad-estudio-de-percepcion-en-brasil/', '_blank').focus();
                })
                
                $('#download_ns6').click(function(){
                    window.open('https://communityengagementhub.org/resource/the-impact-of-covid-19-on-vulnerable-populations-a-perception-study-in-brazil/', '_blank').focus();
                })
                
                $('#download_ns7').click(function(){
                    window.open('https://communityengagementhub.org/resource/covid-19-perception-survey-charles-town-maroons-portland/', '_blank').focus();
                })

                $('#download_ns10').click(function(){
                    window.open('https://communityengagementhub.org/es/resource/medidas-de-prevencion-y-vacuna-contra-la-covid-19-estudio-de-percepcion-de-nicaragua/', '_blank').focus();
                })
                
                // AFTER LOAD HANDLE SCROLL
                
                // Remove the # from the hash, as different browsers may or may not include it
                var hash = location.hash.replace('#','');
                if(hash != ''){
                    var offset = 0;
                    if((hash!='home')){
                        offset = vOffset;
                    }
                    if((hash=='vaccines')||(hash=='trust')||(hash=='accesstoinformation')||(hash=='socioeconomicimpacts')){
                        offset = vOffsetSub;
                    }
                    
                    $('html, body').animate({
                        scrollTop: $("#"+hash).offset().top - offset
                    }, 100);
                    
                    $('#loading').fadeOut();
                    
                } else {
                    $(document).scrollTop(0);
                    $('#loading').fadeOut();
                }
                
            });
        });