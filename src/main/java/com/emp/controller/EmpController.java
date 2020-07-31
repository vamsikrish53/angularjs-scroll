package com.emp.controller;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EmpController {

	List<String> empNames = null;

	@GetMapping(value = "getEmployees", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseObj getEmployees(@RequestParam int offSet, @RequestParam int limit) {
		if (empNames == null) {
			generateNames("ABCDEFG");
			Collections.sort(empNames);
		}

		ResponseObj res = new ResponseObj();
		List<String> names = new ArrayList<>();
		for (int i = offSet; i < offSet + limit; i++) {
			if (i >= empNames.size())
				break;
			names.add(empNames.get(i));
		}
		res.setTotalCount(empNames.size());
		res.setNames(names);
		res.setCurrentCount(names.size());

		return res;
	}

	// Generate dummy names
	public void generateNames(String str) {
		empNames = new ArrayList<String>();
		permutation("", str);
	}

	private void permutation(String perm, String word) {
		if (word.isEmpty()) {
			empNames.add(perm + word);
		} else {
			for (int i = 0; i < word.length(); i++) {
				permutation(perm + word.charAt(i), word.substring(0, i) + word.substring(i + 1, word.length()));
			}
		}
	}

}
