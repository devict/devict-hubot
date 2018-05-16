package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"strings"
)

func main() {
	b, err := ioutil.ReadFile("scripts/channel-guide.txt")
	if err != nil {
		log.Fatal(err)
	}

	sections := strings.Split(string(b), "<!--split-->")
	fmt.Println("Number of sections:", len(sections))

	for i, sec := range sections {
		lns := strings.Split(sec, "\n")
		fmt.Printf("Section %d Lines: %d Characters: %d\n", i+1, len(lns), len([]rune(sec)))
	}
}
