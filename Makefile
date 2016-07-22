all: github-blurred.jpg resume-blurred.jpg

clean:
	rm -f github.jpg
	rm -f github-blurred.jpg
	rm -f resume.jpg
	rm -f resume-blurred.jpg

github-blurred.jpg: github.jpg
	convert github.jpg -blur 0x10 -fill white -colorize 50% github-blurred.jpg

resume-blurred.jpg: resume.jpg
	convert resume.jpg -blur 0x10 -fill white -colorize 50% resume-blurred.jpg

github.jpg:
	phantomjs capture.js http://chrismondok.github.io github.jpg

resume.jpg: 
	phantomjs capture.js http://chrismondok.net/resume resume.jpg
