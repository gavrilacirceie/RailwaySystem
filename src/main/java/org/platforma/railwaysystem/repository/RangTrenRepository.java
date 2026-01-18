package org.platforma.railwaysystem.repository;

import org.platforma.railwaysystem.model.RangTren;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RangTrenRepository extends JpaRepository<RangTren, Long> {}

